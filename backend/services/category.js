const { default: mongoose } = require('mongoose')
const Category = require('../models/categories')

/** шинэ ангилал үүсгэх нь
 * @param {string} req.body.name ангилалын нэр
 */
exports.createAuthor = async (content) =>
{
    await Category.create(content)
}

/** Бүх aother ийн жагсаалтыг авах нь */
exports.getList = async () =>
{
    const foundCategories = await Category.find({}).sort("-createdAt")
    return foundCategories
}

/** Тухайн ангилал ийн мэдээллийг авах нь
 * @param {string} categoryId ангилал ийн ID
 */
exports.getDetail = async (categoryId) =>
{
    const foundCategory = await Category.findById(categoryId)
    return foundCategory
}

exports.update = async (categoryId, body) =>
{
    const cat = await Category.findById(categoryId)
    cat.name = body.name
    await cat.save()
}

exports.delete = async (categoryId) =>
{
    const cat = await Category.findById(categoryId)
    await Category.deleteOne({ _id:  cat._id })
}
