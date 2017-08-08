

const mongoose = require('mongoose');
import myDate from "../utils/MyDate";
const Schema = mongoose.Schema;

let date = new myDate();
let createDate = date.getNowDate();

const UserSchema = new Schema({
    username: {
        type: String,
        default: '',
        require: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        require: true
    },
    introduce: {
        type: String,
        default: '暂无',
    },
    nick_logo: {
        type: String,
        default: '../public/images/nick.png'
    },
    create_date: {
        type: Date,
        default: createDate
    }
});

exports.User = mongoose.model('User', UserSchema);
