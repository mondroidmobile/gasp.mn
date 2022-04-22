const express = require("express");
const router = new express.Router

// middlewares
const asyncHandler = require("../middleware/asyncHandler");
const getCatId = require("../middleware/getCatId");

const newsController = require('../controllers/news')

const { upload } = require("../services/file");

router
    .route("/")
    .post(
        upload.single("image"),
        asyncHandler(newsController.createNews)
    )
    .get(getCatId, asyncHandler(newsController.getNews))

router
    .route("/home/")
    .get(asyncHandler(newsController.getNewsHome))

router
    .route("/:newsId/")
    .get(asyncHandler(newsController.getNewsDetail))
    .put(
        upload.single("image"),
        asyncHandler(newsController.update)
    )
    .delete(asyncHandler(newsController.delete))

module.exports = router
