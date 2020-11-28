const express = require("express");
const bodyParser = require("body-parser");
const { restart } = require("nodemon");
const validator = require("validator");
const URLService = require("./service/URLService");
const URLRepository = require("./repository/URLRepository");
const CryptoURLIDProvider = require("./provider/CryptoURLIDProvider");
// ports
// const PORT = process.env.PORT;
// const HOST = process.env.HOST;

const PORT = "8080";
const HOST = "0.0.0.0";

const app = new express();
const urlIDProvider = new CryptoURLIDProvider();
const repository = new URLRepository(urlIDProvider);
const service = new URLService(repository);

app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get("/create", async (req, res) => {
  const url = req.query.url;

  if (!validator.isURL(url)) {
    const message = { message: "Invalid URL" };
    res.statusCode = 400;
    res.send(message);
  } else {
    const shortUrl = await service.shorten(url);

    res.send({ url: shortUrl });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  const originalURL = await service.findOriginalURLByUrlId(id);

  if (!originalURL) {
    const message = { message: "URL not found" };
    res.statusCode = 404;
    res.send(message);
  } else {
    res.redirect(301, originalURL);
  }
});

app.listen(PORT, HOST);

console.log(`Listening on http://${HOST}:${PORT}`);

module.exports = app;
