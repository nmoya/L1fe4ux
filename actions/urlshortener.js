'use strict'

var shortUrl = function (longUrl, callback) {
  var TinyURL = require('tinyurl')

  TinyURL.shorten(longUrl, function (res) {
    callback(res)
  })
}

module.exports.handle = shortUrl
