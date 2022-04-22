const multer = require("multer");
const path = require("path");

exports.PROJECT_BASE = path.dirname(path.dirname(__dirname))
exports.BASE_DIR = `${this.PROJECT_BASE}/server`
exports.IMAGE_PATH = `${this.PROJECT_BASE}/public/server/images`
const SERVER_PUBLIC_PATH = "/public/images"

/** Зургийг folder-т хадгална */
const storage = multer.diskStorage(
{
    destination: (req, file, cb) =>
    {
        cb(null, `${this.IMAGE_PATH}/`);
    },
    filename: (req, file, cb) =>
    {
        /** өөрчилж хадгалж буй файлын нэр */
        const fileName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        /** back руу хадгалах файлын холбоос */
        file.realPath = `${SERVER_PUBLIC_PATH}/${fileName}`
        return cb(null, fileName)
    }
});

/**
 * @description Файл үүсгэх
 * @param Файл
 */
exports.upload = multer(
{
    storage: storage,
    limits:
    {
        fileSize: 100000000
    }
});

const { unlink } = require('fs');

/**
 * @description Folder-оос файл устгах функц
 * @param {string} url файлийн зам
 */
exports.deleteFile = function (url)
{
    unlink(url, (err) =>
    {
        if (err)
        {
            console.log(err);
        }
    });
}

/**
 * @description File-ийн устгах замыг нь зааж өгч байна (бичлэг болон зурагуудын зам тусдаа).
 * @param {object} req.files Бүх File төрөл
 */
exports.deleteFiles = function (req)
{
    /**  */
    if (req.files)
    {
        for (let item of Object.values(req.files))
        {
            for (let a in item)
            {
                module.exports.deleteFile(`${this.IMAGE_PATH}/${item[a].filename}`)
            }
        }
    }

    if (req.file)
    {
        module.exports.deleteFile(`${this.IMAGE_PATH}/${req.file.filename}`)
    }

}

exports.getFileName = (fullPath) =>
{
    return path.basename(fullPath)
}
