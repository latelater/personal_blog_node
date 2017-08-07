import myDate from "./myDate"

exports.getNowDate = function(req, res, next) {
    let date = new myDate();
    let nowDate = date.getNowDate(true);
    let nowDay = date.getNowDay(true);
    res.json({
        redate: nowDate,
        reday: nowDay
    });
}