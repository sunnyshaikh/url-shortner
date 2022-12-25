const ShortUrl = require("../models/url-model.js")
const validUrl = require("valid-url")
const shortid = require("shortid")

const fetchAll = async (req, res) => {
  try {
    // const urlData = await ShortUrl.find()
    const cookieData = req.cookies.urls
    const urlData = cookieData ? JSON.parse(cookieData) : []
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

    const code = shortid.generate()
    const shortUrl = `https://${req.hostname}/${code}`
    // const shortUrl = `http://localhost:5000/${code}`
    const newUrl = new ShortUrl({
      full: longUrl,
      short: shortUrl,
      code
    })


    let dataArray = []
    const cookieData = req.cookies.urls

    if (cookieData) {
      dataArray = JSON.parse(cookieData)
    }

    const obj = {
      full: newUrl.full,
      short: newUrl.short,
      clicks: newUrl.clicks,
    }

    dataArray = dataArray.concat(obj)

    await newUrl.save()
    res.cookie("urls", JSON.stringify(dataArray), { httpOnly: true }).status(200).json("Succesully shortened")
  }
  catch (err) {
    res.status(500).json(`${err}, Something went wrong`)
  }
}

module.exports = { fetchAll, shortUrl }