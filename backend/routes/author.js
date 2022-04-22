const express = require("express");
const router = new express.Router

// middlewares
const asyncHandler = require("../middleware/asyncHandler");
const loginRequired = require("../middleware/loginRequired")

const authController = require('../controllers/author')

router
    .route("/")
    .post(asyncHandler(authController.create))
    .get(asyncHandler(authController.getList))

router
    .route("/logged/")
    .get(loginRequired, asyncHandler(authController.getDetailWithLogged))

router
    .route("/:authorId/")
    .get(asyncHandler(authController.getDetail))
    .put(asyncHandler(authController.update))
    .delete(asyncHandler(authController.delete))

module.exports = router
