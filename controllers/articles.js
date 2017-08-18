import {code as codeMsg} from '../utils/code';
import {Category} from '../models/categoryList';
import {User} from '../models/usersInfo';
import {Article} from '../models/articleList';
import myDate from "../utils/MyDate";
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
}

exports.articleList = function(req, res, next) {
    Article.find({}, function(err, articles) {
        if(articles) {
            res.json({
                code: 200,
                message: codeMsg['200'],
                data: articles
            })
        } else {
            res.json({
                code: 500,
                message: codeMsg['500'],
                data: ''
            })
        }
    })
}