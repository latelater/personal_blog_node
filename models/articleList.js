// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import User from './usersInfo';
import Category from './categoryList'
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    title: {
        type: String,
        default: '',
        require: true
    },
    content: {
        type: String,
        default: 'an empty article'
    },
    article_date: {
        type: Date,
        default: '',
        require: true
    },
    // 文章大分类
    category_name: {
        type: String,
        default: '我是未分类'
    }
    // category: { 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    //     require: true
    // },
    // author: {
    //     type: String,
    //     default: User.username,
    // }
});

exports.Article = mongoose.model('Article', ArticleSchema);
