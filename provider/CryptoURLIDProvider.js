const cryptoRandomString = require("crypto-random-string");

class CryptoURLIDProvider {
  async urlId() {
    const urlId = cryptoRandomString({ length: 7, type: "url-safe" });
    return urlId;
  }
}

module.exports = CryptoURLIDProvider;
