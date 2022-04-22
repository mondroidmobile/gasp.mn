const videoService = require('../services/video');

/** Шинээр video үүсгэх нь
 * @param {string} req.body.url     тухайн бичлэгний зам
 * @param {string} req.body.title   тухайн бичлэгний гарчиг
 * @param {string} req.body.author  бичлэгийг үүсгэж буй author ийн ID
 * @param {string} req.body.category    ангилалын ID
 * @param {number} req.body.views   бичлгэндээр дарж орсон хүний тоо
*/
exports.create = async (req, res) =>
{
    // бичлэгийг үүсгэж байна
    await videoService.createAuthor(req.body)
    res.sendInfo('Амжилттай хадгалалаа');
}

/** Бүх video ийн жагсаалтыг авах нь
 * @param {string} req.query.category ангиалалын iD
*/
exports.getList = async (req, res) =>
{
    const { category, start } = req.query
    const foundVideos = await videoService.getList(category, start)
    res.sendData(foundVideos);
}

/** Тухайн нэг video ний дэлгэрэнгүйг авах нь
 * @param {string} req.params.videoId тухайн video ны ID
 */
exports.getVideo = async (req, res) =>
{
    const { videoId } = req.params
    const foundVideo = await videoService.getDetail(videoId)
    res.sendData(foundVideo);
}

exports.update = async (req, res) =>
{
    const { videoId } = req.params
    const body = req.body
    await videoService.update(videoId, body)
    res.sendInfo("Амжилттай заслаа")
}

exports.delete = async (req, res) =>
{
    const { videoId } = req.params
    await videoService.delete(videoId)
    res.sendInfo("Амжилттай устгалаа")
}
