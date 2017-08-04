

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
    }
});

exports.User = mongoose.model('User', UserSchema);
