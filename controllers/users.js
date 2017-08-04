const User = require('../models/usersInfo').User;
const pinyin = require('pinyin');

exports.create_user = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.create({
        username: username,
        password: password
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
