require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors")

const urlRoute = require("./routes/url-route.js");
const ShortUrl = require("./models/url-model.js")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.use("/api/shortner", urlRoute)


app.get("/:code", async (req, res) => {
  const code = req.params.code

  try {
    const urlData = await ShortUrl.findOne({ code })
    if (!urlData)
      return res.status(400).json("Url not found")

    urlData.clicks++
    await urlData.save()

    res.redirect(urlData.full)
  }
  catch (err) {
    res.status(500).json("Internal server problem!")
  }
})

const PORT = process.env.PORT || 5000
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => app.listen(PORT, () => console.log("Server and DB connected")))
  .catch(err => console.log(err))