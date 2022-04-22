const newsService = require('../services/news');

/** Шинээр мэдээ үүсгэх нь
 * @param {string} req.body.title       тухайн мэдээний гарчиг
 * @param {string} req.body.text        тухайн мэдээний товч тайлбар
 * @param {string} req.body.author      тухайн мэдээг үүсгэсэн хүний ID
 * @param {string} req.body.news        тухайн мэдээний үндсэн мэдээлэл
 * @param {string} req.body.category    ангилалын ID
 * @param {string} req.file.realPath    тухайн мэдээний зургийн холбоос
 * TODO: authorId -г loginRequired аас авах
*/
exports.createNews = async (req, res) =>
{
    /** мэдээний зургийн замийг оноох хувьсагч */
    let imageUrl = ""

    /** req ээс жинхэнэ зургын холбоосыг авах нь */
    if (req.file)
    {
        imageUrl = req.file.realPath
    }

    /** зургийн холбоосыг оноох нь */
    req.body.image = imageUrl

    // мэдээг үүсгэж байна
    await newsService.createNewNews(req.body)
    res.sendInfo('Амжилттай хадгалалаа');
}

/** Бүх мэдээнүүдийг авах нь
 * @param {string} req.query.category ангилалын ID
*/
exports.getNews = async (req, res) =>
{
    const { category, start } = req.query
    const foundNews = await newsService.getNewsList(category, start)
    res.sendData(foundNews);
}

/** Тухайн нэг мэдээний дэлгэрэнгүйг авах нь
 * @param {string} req.params.newsId тухайн мэдээний ID
 */
exports.getNewsDetail = async (req, res) =>
{
    const { newsId } = req.params
    const foundNews = await newsService.getNewsDetail(newsId)
    res.sendData(foundNews);
}

/** тухайн мэдээг шинэчлэх нь
 * @param {string} req.params.newsId тухайн мэдээний ID
*/
exports.update = async (req, res) =>
{
    /** мэдээний зургийн замийг оноох хувьсагч */
    let imageUrl = ""

    /** req ээс жинхэнэ зургын холбоосыг авах нь */
    if (req.file)
    {
        imageUrl = req.file.realPath
        /** зургийн холбоосыг оноох нь */
        req.body.image = imageUrl
    }

    const { newsId } = req.params
    await newsService.update(newsId, req.body)
    res.sendInfo("Амжилттай заслаа");
}

/** мэдээ устгах нь
 * @param {string} req.params.newsId тухайн мэдээний ID
 */
exports.delete = async (req, res) =>
{
    const { newsId } = req.params
    await newsService.delete(newsId)
    res.sendInfo("Амжилттай устгалаа");
}

exports.getNewsHome =  async (req, res) =>
{
    const newsHome = await newsService.newsHome()
    res.sendData(newsHome);
}
