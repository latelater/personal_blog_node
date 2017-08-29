import {code as codeMsg} from '../utils/code';
import {Category} from '../models/categoryList';
import {Article} from '../models/articleList';
import {User} from '../models/usersInfo';
import myDate from "../utils/MyDate";

exports.createCategory = function(req, res, next) {
    let username = req.body.username;
    let category_name = "我是未分类";
    if(req.body.category_name) {
        category_name = req.body.category_name;
        console.log(category_name);
    }

    let date = new myDate();
    let createDate = date.getNowDate();

    User.findOne({
        username: username
    }, function(err, user) {
        if(err) {
            res.json({
                code: err.code,
                message: codeMsg[err.code] || codeMsg['10103'],
                data: err.message
            })
        } else {
            Category.findOne({
                category_name: category_name
            }, function(err, category) {
                if(!category) {
                    Category.create({
                        user: user,
                        category_name: category_name,
                        create_date: createDate,
                    }, function(err, category) {
                        if(err) {
                            res.json({
                                code: err.code,
                                message: codeMsg[err.code] || codeMsg['500'],
                                data: err.message
                            })
                        } else {
                            res.json({
                                code: 200,
                                message: codeMsg['200'],
                                data: category
                            })
                        }
                    });
                } else {
                    res.json({
                        code: 10107,
                        message: codeMsg['10107'],
                        data:category
                    })
                }
            })
        }
    })  
};

// 分类下的所有文章名
exports.categoryArticles = async function (req, res, next) {
    let categories = [];
    let category_articles = {
        "custom": {
            // "分类名1": [
            //     article1,
            //     article2
            // ],
            // "分类名2":[

            // ]
        },
        "date": {
            // "2017年":{
            //     "6月": [
            //         article1,
            //         article2
            //     ]
            // },
            // "2016年": {
            //     "6月": [
            //         article1,
            //         article2
            //     ] 
            // }
        }
    };
    await Category.find({},function(err, category) {
        if(category) {
             categories = category;
        }
    });
    if(categories == []) {
        console.log("不存在");
        res.json({
            code: 500,
            message: codeMsg['500'],
            data:''
        }) 
    } else {
        for(var i = 0; i < categories.length; i++) {
            let category_item = await getArticleName(categories[i]);
            Object.assign(category_articles.custom, category_item);
            
            let category_date = await getArticleDate(categories[i], category_articles);
            // Object.assign(category_articles.date, category_date);
        }
        res.json({
            code: 200,
            message: codeMsg['200'],
            data:category_articles
        })
    }
}

function searchArticles(category) {
    return new Promise(function(resolve,rejected) {
        Article.find({category: category}, function(err, articles) {
            if(articles) {
                resolve(articles);
            } else {
                rejected(err);
            }
        });
    })
}

async function getArticleDate(category, category_articles) {
    let articleDates = [];
    // let articleDateYY = [];
    // let articleDateMM = [];
    // let yearObj = {};
    let articles = await searchArticles(category._id);
    articles.forEach(function(article) {
        articleDates.push(article.article_date);
    }, this);
    articleDates.sort(function(a, b) {  
        return a < b ? 1 : -1;  
    });

    // 求年份的列表
    for(let i = 0, j = 0; i < articleDates.length; i++) {
        let year = articleDates[i].getFullYear();
        let yearObj = {
            [year]:{}
        }
        Object.assign(category_articles.date, yearObj);
    }


    for(let i = 0; i < articleDates.length; i++){
        let year = articleDates[i].getFullYear();
        let month = articleDates[i].getMonth() + 1;
        for(let key in category_articles.date) {    
            if(year == key) {
                // category_articles.date[key] = {}
                let monthObj = {
                    [month]: []
                };
                console.log(key, monthObj);
                Object.assign(category_articles.date[key], monthObj);
                console.log(category_articles.date[key], "***********");
                
            }
        }
    }


}
async function getArticleName(category) {
    let categoryName = category.category_name;
    let articleName = [];
    let articles = await searchArticles(category._id);
    articles.forEach(function(article) {
        articleName.push(article.title);
    }, this);
    let category_item = {
        [categoryName]:articleName
    };
    return category_item;
}

