const Category = require("../models/categories")

/**
 * category ийн нэрээр cat ийн ID олох нь
 */
const getCatId = async (req, res, next) => {
    /** cat ийн нэр */
    const { category } = req.query
    const foundCat = await Category.findOne(
        {
            name: category
        }
    )
    req.query.category = foundCat?._id || category
    next()
}

module.exports = getCatId
