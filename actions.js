const Controller = require('./controller.js')
const C = require('./constants.js')

module.exports = [{
  properties: {
    label: C.TRAY.EURO,
    enabled: false
  },
  hotkey: 'Control+e',
  callback: function () {
    require('./actions/currency.js').convert('EUR', 'BRL', function (result) {
      console.log(Controller)
      Controller.notifications.send(result)
    })
  }
}, {
  properties: {
    label: C.TRAY.GIST,
    enabled: false
  },
  hotkey: 'Control+g',
  callback: function () {
    console.log('Implement-me')
  }
}]
