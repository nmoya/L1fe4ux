const keys = require('./keys.js')
const oxr = require('open-exchange-rates')
const fx = require('money')

var convert = function (curr1, curr2, callback) {
  oxr.set({
    app_id: keys.openExchangeRates
  })
  oxr.latest(function () {
    fx.rates = oxr.rates
    fx.base = oxr.base
    var value = fx(1).from(curr1).to(curr2).toFixed(3)
    callback(1 + ' ' + curr1 + ' = ' + value + ' ' + curr2)
  })
}

module.exports.convert = convert
