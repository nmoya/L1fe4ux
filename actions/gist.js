'use strict'

var gistHandler = function (gistContent, callback) {
  var quickGist = require('quick-gist')

  var options = {
    content: gistContent,
    public: false,
    enterpriseOnly: false
  }
  quickGist(options, function (resp, err, data) {
    callback(data.html_url)
  })
}

module.exports.handle = gistHandler
