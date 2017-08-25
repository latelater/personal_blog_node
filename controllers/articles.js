import {code as codeMsg} from '../utils/code';
import {Category} from '../models/categoryList';
import {User} from '../models/usersInfo';
import {Article} from '../models/articleList';
import myDate from "../utils/MyDate";
// var async = require('async');
/**
 * category_name
 * title
 * content
 */
exports.createArticle = function(req, res, next) {
    // let username = req.body.username;
    let category_name = req.body.category_name;
    let title = req.body.title;
    let content = req.body.content;

    let date = new myDate();
    let createDate = date.getNowDate();

    Category.findOne({
        category_name: category_name
    },function(err, category) {
        if(category) {
            Article.create({
                user: category.user,
                title: title,
                content: content,
                article_date: createDate,
                category: category
            }, function(err, article) {
                if(err) {
                    res.json({
                        code: err.code,
                        message: codeMsg[err.code] || codeMsg['500'],
                        data: ''
                    })
                } else {
                    res.json({
                        code: 200,
                        message: codeMsg['200'],
                        data: article
                    })
                }
            })
        } else {
            res.json({
                code: err.code,
                message: codeMsg[err.code] || codeMsg['404'],
                data: ''
            })
        }
    })
};

exports.articleList = async function(req, res, next) {
    let articlesDate = [];
    Article.find({}, function(err, articles) {
        if(articles) {
            for(var i = 0; i < articles.length; i++) {
                let article = articles[i];
                let articleDate = {
                    title: article.title,
                    author: "",
                    article_date: article.article_date,
                    content: article.content,
                    category_name: ""
                };

                if(article.user) {
                    await userPromise(article).then((data) => {
                        if(data.username) {
                            articleDate.author = data.username;
                            console.log(articleDate.author); 
                        }
                    })
                }

                if(article.category) {
                    Category.findOne({
                        _id: article.category
                    }, function(err, category){
                        if(category) {
                            articleDate.category_name = category.category_name;
                        }
                    })
                }
                console.log(articleDate);
                articlesDate[i] = articleDate;
            }
            res.json({
                code: 200,
                message: codeMsg['200'],
                data: articlesDate
            })
        } else {
            res.json({
                code: 500,
                message: codeMsg['500'],
                data: ''
            })
        }
    })
};

function userPromise(article) {
    return new Promise(function(resolve,rejected) {
        User.findOne({
            _id: article.user
        }, function(err, user) {
            if(user) {
                resolve(user);
            } else {
                rejected(err);
            }
        })
    })
}
