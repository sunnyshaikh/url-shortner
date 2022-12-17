const express = require("express")
const { fetchAll, shortUrl } = require("../controllers/url-controller.js")
const router = express.Router()

router.get("/", fetchAll)
router.post("/", shortUrl)


module.exports = router