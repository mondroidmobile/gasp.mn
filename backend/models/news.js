const mongoose = require('mongoose');
const Author = require('./authors')
const Category = require('./categories')

const NewsSchema = new mongoose.Schema({

    /** Мэдээний гарчиг */
    title: {
        type: String,
        required: true
    },
    /** Мэдээг үүсгэгч */
    author: {
        type: mongoose.Types.ObjectId,
        ref: Author,
        required: true
    },
    /** Мэдээний товч тайлбар */
    text: {
        type: String,
        required: true,
    },
    /** Мэдээний thumbnail зураг */
    image: {
        type: String,
        required: false,
    },
    /** Мэдээний үндсэн мэдээлэл */
    news: {
        type: String,
        required: true,
    },
    /** Ангилал */
    category: {
        type: mongoose.Types.ObjectId,
        ref: Category,
        required: true,
    }
}, {
    timestamps: true,
})

const News = mongoose.model('News', NewsSchema);

module.exports = News
