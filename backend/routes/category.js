const express = require("express");
const router = new express.Router

// middlewares
const asyncHandler = require("../middleware/asyncHandler");

const categoryController = require('../controllers/category')

router
    .route("/")
    .post(asyncHandler(categoryController.create))
    .get(asyncHandler(categoryController.getList))

router
    .route("/:categoryId/")
    .get(asyncHandler(categoryController.getDetail))
    .put(asyncHandler(categoryController.update))
    .delete(asyncHandler(categoryController.delete))

module.exports = router
