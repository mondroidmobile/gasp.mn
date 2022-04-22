const express = require("express");
const router = new express.Router

// middlewares
const asyncHandler = require("../middleware/asyncHandler");
const getCatId = require("../middleware/getCatId");

const videoController = require('../controllers/video')

router
    .route("/")
    .post(asyncHandler(videoController.create))
    .get(getCatId, asyncHandler(videoController.getList))

router
    .route("/:videoId/")
    .get(asyncHandler(videoController.getVideo))
    .put(asyncHandler(videoController.update))
    .delete(asyncHandler(videoController.delete))

module.exports = router
