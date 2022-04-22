const MyError = require('../middleware/error')
const Authors = require('../models/authors')

/** шинэ author үүсгэх нь
 * @param {string} content.nickName    тухайн үүсгэгчийн нийтэд харагдах нэр
 * @param {string} content.email       тухайн үүсгэгчийн цахим шуудан
 */
exports.createAuthor = async (content) =>
{
    if (!content.emai)
    {
        throw new MyError("Цахим шуудан байхгүй байна")
    }
    content.email = content.email.toLowerCase().trim()
    await Authors.create(content)
}

/** Бүх aother ийн жагсаалтыг авах нь */
exports.getList = async () =>
{
    const foundAuthors = await Authors.find({}).select("-password").sort("-createdAt")
    return foundAuthors
}

/** Тухайн author ийн мэдээллийг авах нь
 * @param {string} authorId author ийн ID
 */
exports.getDetail = async (authorId) =>
{
    const foundAuthor = await Authors.findById(authorId).select("-password")
    return foundAuthor
}

exports.update = async (authorId, body) =>
{

    if (body?.email)
    {
        body.email = body.email.toLowerCase().trim()
    }

    await Authors.updateOne(
        {
            _id: authorId,
        },
        body
    )
}

exports.delete = async (authorId) =>
{
    await Authors.deleteOne({ _id: authorId })
}
