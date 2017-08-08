import {code as codeMsg} from '../utils/code'
import {Category} from '../models/categoryList';
import {User} from '../models/usersInfo';
import myDate from "../BaseControllers/MyDate";

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
}
