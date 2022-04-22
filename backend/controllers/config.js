//  model оруулж ирж байгаа
const configService = require('../services/config')

const { deleteFile, IMAGE_PATH, getFileName } = require("../services/file")

/**
 * Config ийг авах нь
 * @param {Array} req.query.names тохиргооны нэрнүүд
 */
exports.get = async (req, res) =>
{
    const { names } = req.query

    const configs = await configService.getConfigs(names)

    res.sendData(configs)
}

/**
 * Config ийг хадгалах нь
 * @param {*} req.body.configs Config ийг хадгалах
 */
exports.post = async (req, res) =>
{
    const { configs } = req.body

    await configService.saveConfigs(configs)

    res.sendInfo('Амжилттай үүсгэлээ')
}

/**
 * Config ийг засах нь
 * @param {*} req.body.configs Config ийг хадгалах
 */
exports.put = async (req, res) =>
{
    const { configs } = req.body

    await configService.updateConfigs(configs)

    res.sendInfo('Амжилттай заслаа')
}

/**
 * Зураг хадгадах
 * @param {Object} req.file  Хадгалах зураг
 */
exports.addImage = async (req, res) =>
{
    res.sendDataInfo('Зураг хадгласан', req.file.realPath);
}

exports.deleteImage = async (req, res) =>
{
    const image = req.body.image
    if (!image)
        return res.sendInfo("Зураг байхгүй байна")
    let fileName = getFileName(image)
    deleteFile(IMAGE_PATH + "/" + fileName)
    res.sendInfo('Зургийг устгасан');
}
