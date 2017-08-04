

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

exports.User = mongoose.model('User', UserSchema);
