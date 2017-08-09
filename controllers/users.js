import {code as codeMsg} from '../utils/code';
import {Category} from '../models/categoryList';
import {User} from '../models/usersInfo';
import encryptClass from "../utils/Encrypt";
import myDate from "../utils/MyDate";

exports.create_user = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let encryptedObj = new encryptClass();
    let encryptedStr = encryptedObj.encryptedPass(password);

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
                    data: user
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
                req.session.user = user;
                console.log(req.session.user);
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

exports.user_info = function(req, res, next) {
    let username = req.body.username;
    User.findOne({
        username: username
    }, function(err, user) {
        if(user) {
            res.json({
            })
        } else {  
          
        }
    })
};

