const ShortUrl = require("../models/url-model.js")
const validUrl = require("valid-url")
const shortid = require("shortid")

const fetchAll = async (req, res) => {
  try {
    const urlData = await ShortUrl.find()
    res.status(200).json(urlData)
  }
  catch (err) {
    res.status(500).json("Internal server problem!")
  }
}

const shortUrl = async (req, res) => {
  const longUrl = req.body.urlInput

  if (!validUrl.isUri(longUrl))
    return res.status(400).json("Please enter a valid url");

  try {
    const urlExists = await ShortUrl.findOne({ full: longUrl })
    if (urlExists)
      return res.status(400).json("Long url already exists")
    const shortUrl = "https://" + req.hostname + '/' + shortid.generate()
    const newUrl = new ShortUrl({
      full: longUrl,
      short: shortUrl
    })

    await newUrl.save()
    res.status(200).json("Successful")
  }
  catch (err) {
    res.status(500).json("Something went wrong")
  }
}

module.exports = { fetchAll, shortUrl }