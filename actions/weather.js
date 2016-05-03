'use strict'
const sprintf = require('sprintf').sprintf

var now = function (city, callback) {
  var weather = require('yahoo-weather')
  weather(city).then(function (data) {
    callback(sprintf('%s: %s°C\tWind: %s km/h\nSunset: %s', city, data.item.condition.temp,
      (data.wind.speed / 1.6).toFixed(0),
      data.astronomy.sunset))
  })
}

module.exports.handle = now
