// const User = require('../models/usersInfo').User;
// const Category = require('../models/categoryList').Category;
import {code as codeMsg} from '../utils/code'
import {Category} from '../models/categoryList';
import {User} from '../models/usersInfo';
import encryptClass from "../BaseModels/Encrypt";
import myDate from "../BaseModels/MyDate";

exports.create_user = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let encryptedObj = new encryptClass();
    let encryptedStr = encryptedObj.encryptedPass(password);

    let date = new myDate();
    let createDate = date.getNowDate(true);

    User.create({
        username: username,
        password: encryptedStr
    }, function (err, user) {
            if (err) {
                res.json({
                    code: err.code,
                    message: codeMsg[err.code] || CodeMsg['500'],
                    data: ''
                });
            } else {
                res.json({
                    code: 200,
                    message: codeMsg['200'],
                    data: user._id
                });

                Category.create({
                    user: user,
                    category_name: "我是未分类",
                    create_date: createDate,
                }, function(err, category) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("wo cheng gong le")
                    }
                });
            }
        }
    );

};

exports.login = function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({
        username: username
    }, function(err, user) {
        if(err) {
            res.json({
                code: err.code,
                message: CodeMsg[err.code] || CodeMsg['10101'],
                data: err.message
            })
        } else if(user) {
            let encryptedObj = new encryptClass();
            let encryptedStr = encryptedObj.encryptedPass(password);
            if(user.password === encryptedStr) {
                res.json({
                    code: 200,
                    message: codeMsg['200'],
                    data: user
                })
            } else {
                res.json({
                    code: 10106,
                    message: codeMsg['10106'],
                    data: ''
                })
            }
        }
    });
};

