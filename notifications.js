'use strict'
const notifier = require('node-notifier')
const C = require('./constants.js')

var notify = function (content) {
  notifier.notify({
    title: C.NOTIFICATIONS.TITLE,
    message: content,
    icon: C.NOTIFICATIONS.ICON,
    sound: false,
    wait: false
  }, function (err, response) {
    if (err) {
      console.log('Cannot send notification: ' + err)
    }
  })
}

module.exports.notify = notify
