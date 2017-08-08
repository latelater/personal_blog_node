import {code as codeMsg} from './code';

exports.requireLogin = function(req, res, next) {
    let session = req.session.user;
    if(session) {
        return next()
    } else {
        return res.json({
            code: 10102,
            message: codeMsg['10102'],
            data: ''
        });
    }
}