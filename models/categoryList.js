const mongoose = require('mongoose');
import myDate from "../BaseModels/MyDate";
const Schema = mongoose.Schema;
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
        type: String,
        default: '',
        require: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
    }
});

exports.Category = mongoose.model('Category', CategorySchema);
