const mongoose = require('mongoose');

const CatergorySchema = new mongoose.Schema({
    /** Нэр */
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

const Category = mongoose.model('Category', CatergorySchema);

module.exports = Category
