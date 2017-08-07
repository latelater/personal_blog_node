const User = require('../models/usersInfo').User;
const Category = require('../models/categoryList').Category;
const pinyin = require('pinyin');
// const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.create_user = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    var it = makeIterator(['a', 'b']);

    console.log(it.next())
    console.log(it.next())
    console.log(it.next())

    function makeIterator(array) {
        var nextIndex = 0;
        return {
            next: function() {
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {value: undefined, done: true};
            }
        };
    }
    
    // bcrypt.hash(password, saltRounds, function (err, hash) {
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
    // })  

};


// exports.create_user = function (req, res, next) {
//     var username = req.body.username;
//     var password = req.body.password;

//     bcrypt.hash(password, saltRounds, function (err, hash) {
//         console.log(hash);
//         User.create({
//                 username: username,
//                 password: hash
//             }, function (err, user) {
//                 if (err) {
//                     res.json({
//                         code: err.code,
//                         message: CodeMsg[err.code] || CodeMsg['500'],
//                         data: err.message
//                     });
//                 } else {
//                     res.json({
//                         code: 200,
//                         message: CodeMsg['200'],
//                         data: user._id
//                     });
//                 }
//             }
//         );
//     });

// };
