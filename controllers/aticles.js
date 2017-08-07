
// const myDate = require('./myDate').myDate;

import myDate from "./myDate"
exports.getNowDate = function(req, res, next) {
    let date = new myDate();
    let nowDate = date.printNowDate();
    res.json({
        redate: nowDate
    })
}