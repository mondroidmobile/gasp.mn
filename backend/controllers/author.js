const authorService = require('../services/author');

/** Шинээр author үүсгэх нь
 * @param {string} req.body.nickName    тухайн үүсгэгчийн нийтэд харагдах нэр
 * @param {string} req.body.email       тухайн үүсгэгчийн цахим шуудан
*/
exports.create = async (req, res) =>
{
    // author үүсгэж байна
    await authorService.createAuthor(req.body)
    res.sendInfo('Амжилттай хадгалалаа');
}

/** Бүх author ийн жагсаалтыг авах нь */
exports.getList = async (req, res) =>
{
    const foundAuthors = await authorService.getList()
    res.sendData(foundAuthors);
}

/** Тухайн нэг author дэлгэрэнгүйг авах нь
 * @param {string} req.params.authorId тухайн author ийн ID
 */
exports.getDetail = async (req, res) =>
{
    const { authorId } = req.params
    const foundAuthor = await authorService.getDetail(authorId)
    res.sendData(foundAuthor);
}

exports.getDetailWithLogged = async (req, res) =>
{
    const authId = req.userId
    const foundAuthor = await authorService.getDetail(authId)
    res.sendData(foundAuthor);
}

exports.update = async (req, res) =>
{
    const { authorId } = req.params
    const body = req.body
    await authorService.update(authorId, body)
    res.sendInfo("Амжилттай заслаа")
}

exports.delete = async (req, res) =>
{
    const { authorId } = req.params
    await authorService.delete(authorId)
    res.sendInfo('Амжилттай устагалаа');
}
