const mongoose = require('mongoose');
const Author = require('./authors')
const Category = require('./categories')

const VideosSchema = new mongoose.Schema({
    /** Тухайн бичлэгний холбоос */
    url: {
        type: String,
        required: true
    },
    /** Тухайн бичлэгний гарчиг */
    title: {
        type: String,
        required: true,
    },
    /** Тухайн бичлэгийг бүртгэсэн author */
    author: {
        type: mongoose.Types.ObjectId,
        ref: Author,
        required: true,
    },
    /** Бичлгэндээр дарж орсон хүний тоо */
    views: {
        type: Number,
        default: 0,
        required: false,
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

const Video = mongoose.model('Video', VideosSchema);

module.exports = Video
