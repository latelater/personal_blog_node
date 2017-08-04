const User = require('../models/usersInfo').User;
const pinyin = require('pinyin');

exports.create_user = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body);
    console.log(`username: ${username}\npassword: ${password}`);

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
