const express = require("express")
const router = new express.Router

// middlewares
const asyncHandler = require("../middleware/asyncHandler");
const queryParser = require("../middleware/queryParser");

const configApp = require('../controllers/config')
const { upload } = require("../services/file");

router
  .route("/")
  .get(queryParser({ names: [''] }), asyncHandler(configApp.get))
  .post(asyncHandler(configApp.post))
  .put(asyncHandler(configApp.put))

router
  .route("/image/")
  .post(
    upload.single("image"),
    asyncHandler(configApp.addImage)
  )
  .delete(asyncHandler(configApp.deleteImage))

module.exports = router;
