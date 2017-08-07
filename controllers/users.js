// const User = require('../models/usersInfo').User;
// const Category = require('../models/categoryList').Category;

import {Category} from '../models/categoryList';
import {User} from '../models/usersInfo';
import encryptClass from "../BaseModels/Encrypt";

exports.create_user = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let encrypted = new encryptClass();
    let encryptedPass = encrypted.encryptedPass(password);

    User.create({
        username: username,
        password: encryptedPass
    }, function (err, user) {
            if (err) {
                res.json({
                    code: err.code,
                    message: err.errmsg,
                });
            } else {
                res.json({
                    code: 200,
                    message: "success",
                });
            }
        }
    );

};

