const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    category_name: {
        type: String,
        default: '',
        require: true
    },
    create_date: {
        type: Date,
        default: '',
        require: true
    },
    aticle: {
        type: Schema.Types.ObjectId,
        ref: 'Aticle',
        require: true
    }
});

exports.Category = mongoose.model('Category', CategorySchema);
