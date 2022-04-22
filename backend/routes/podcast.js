const express = require("express");
const router = new express.Router

// middlewares
const asyncHandler = require("../middleware/asyncHandler");
const getCatId = require("../middleware/getCatId")

const podcastController = require('../controllers/podcast')
const { upload } = require("../services/file");

router
    .route("/")
    .post(
        upload.single("image"),
        asyncHandler(podcastController.create)
    )
    .get(getCatId, asyncHandler(podcastController.getList))

router
    .route("/:podcastId/")
    .get(asyncHandler(podcastController.getPodcast))
    .put(
        upload.single("image"),
        asyncHandler(podcastController.update)
    )
    .delete(asyncHandler(podcastController.delete))

module.exports = router
