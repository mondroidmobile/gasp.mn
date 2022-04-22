const mongoose = require('mongoose')
const Podcast = require('../models/podcast')

const  { MORE_DATA } = require("../utils/index")

const { deleteFile, IMAGE_PATH, getFileName } = require("./file")

/** шинэ podcast үүсгэх нь
 * @param {string} content.title       тухайн podcast гарчиг
 * @param {number} content.clock       тухайн podcast ны үргэлжлэх хугацаа
 * @param {string} content.text        товч тайлбар
 * @param {string} content.author      author ийн ID
 * @param {string} content.category    ангилалын ID
 * @param {string} content.image       thumbnail зургийн холбоос
 */
exports.createPodcast = async (content) =>
{
    await Podcast.create(content)
}

/** Бүртгэлтэй бүх podcast жагсаалтыг авах
 * @param {string} category ангиалалын iD
*/
exports.getList = async (category, start) =>
{

    if (start)
        start = parseInt(start)

    /** Хайх нөхцөл */
    const where = {}
    /** ангилал байвал ангилалаар нь шүүх */
    if (category)
        where['category'] = category

    /** хайгаад олдсон podcast ууд */
    const news = await Podcast.find(where).populate(
        [
            {
                path: "author",
                select: 'email nickName'
            },
            {
                path: "category",
                select: "name"
            }
        ]
    ).sort("-createdAt").skip(start).limit(start + MORE_DATA - 1)
    return news
}

/** Тухайн нэг podcast дэлгэрэнгүйг авах нь
 * @param {string} podcastId тухайн podcast ID
 */
exports.getDetail = async (podcastId) =>
{
    /** хайгаад олдсон podcast */
    const news = await Podcast.findById(podcastId).populate(
        [
            {
                path: "author",
                select: 'email nickName'
            },
            {
                path: "category",
                select: "name"
            }
        ]
    )
    return news
}

/** тухай podcast засах нь
 * @param {string} podcastId тухайн podcast ID
 * @param {object} content шинэчлэх мэдээлэл
 */
exports.update = async (podcastId, content) =>
{
    const oldPodcast = await Podcast.findById(podcastId)
    let image = oldPodcast.image
    /** id аар нь хайж олоод засах нь */
    const updated = await Podcast.updateOne(
        {
            _id: podcastId
        },
        content
    )

    /** алдаа гарсан бол */
    if (updated.modifiedCount === 0)
    {
        throw new Error("Засахад алдаа гарсан байна")
    }
    else {
        if (content.image)
        {
            let fileName = getFileName(image)
            deleteFile(IMAGE_PATH + "/" + fileName)
        }
    }

}

exports.delete = async (podcastId) =>
{
    const oldPodcast = await Podcast.findById(podcastId)
    let image = oldPodcast.image
    const deleted = await Podcast.deleteOne({ _id: podcastId })
    if (deleted.deletedCount === 1)
    {
        let fileName = getFileName(image)
        deleteFile(IMAGE_PATH + "/" + fileName)
    }
    else {
        throw new Error("Устгахад алдаа гарсан байна")
    }
}
