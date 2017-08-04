const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AticleSchema = new Schema({
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
        default: 'an empty aticle'
    },
    aticle_date: {
        type: Date,
        default: '',
        require: true
    },
    // author: {
    //     type: String,
    //     default: User.username,
    // }
});

exports.Aticle = mongoose.model('Aticle', AticleSchema);
