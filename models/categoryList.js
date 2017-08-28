const mongoose = require('mongoose');
import myDate from "../utils/MyDate";
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let date = new myDate();
let createDate = date.getNowDate();
/**
 * 文章分类
 */
const CategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    category_name: {
        type: String,
        default: '我是未分类',
        require: true
    },
    create_date: {
        type: Date,
        default: createDate,
        require: true
    },
    // article: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Article',
    // }
});

exports.Category = mongoose.model('Category', CategorySchema);
