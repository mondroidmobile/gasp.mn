const express = require("express");
const router = new express.Router

// middlewares
const asyncHandler = require("../middleware/asyncHandler");
const loginRequired = require('../middleware/loginRequired')

const signController = require('../controllers/sign')

router
    .route("/in/")
    .post(asyncHandler(signController.login))

router
    .route("/out/")
    .get(loginRequired, asyncHandler(signController.logout))

router
    .route("/resetpassword/")
    .post(asyncHandler(signController.resetPassword))

router
    .route("/confirmpassword/")
    .put(asyncHandler(signController.confirmPassword))

module.exports = router
