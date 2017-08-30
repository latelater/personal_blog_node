import {code as codeMsg} from './code';

exports.requireLogin = function(req, res, next) {
    let session = req.session.user;
    console.log(session);
    if(session) {
        console.log("session cun zai");
        return next()
    } else {
        return res.json({
            code: 10102,
            message: codeMsg['10102'],
            data: ''
        });
    }
};