const mongoose = require("mongoose")
const shortid = require("shortid")

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  }
})

const ShortUrl = new mongoose.model("shorturls", urlSchema)

module.exports = ShortUrl