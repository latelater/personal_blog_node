// const User = require('../models/usersInfo').User;
// const Category = require('../models/categoryList').Category;
import {code as codeMsg} from '../utils/code'
import {Category} from '../models/categoryList';
import {User} from '../models/usersInfo';
import encryptClass from "../BaseModels/Encrypt";

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
                    data: user._id
                });
            }
        }
    );

};

exports.login = function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    
    User.findOne(
        {
            username: username
        },
        function (err, user) {
            if (err) {
                res.json({
                    code: err.code,
                    message: CodeMsg[err.code] || CodeMsg['500'],
                    data: err.message
                });
            } else {
                if (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result === true) {
                            req.session.user = user;
                            res.json({
                                code: 200,
                                message: CodeMsg['200'],
                                data: user
                            });
                        } else {
                            res.json({
                                code: 10101,
                                message: CodeMsg['10101'],
                                data: ''
                            });
                        }
                    });
                } else {
                    res.json({
                        code: 404,
                        message: CodeMsg['404'],
                        data: ''
                    });
                }
            }
        }
    );
};

