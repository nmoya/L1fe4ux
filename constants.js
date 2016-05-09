'use strict'
const path = require('path')

module.exports = {
  ACTIONS: {
    CURRENCY: {
      label: 'Ctrl + E: Euro',
      hotkey: 'Control+e',
      actionFile: 'currency.js'
    },
    GIST: {
      label: 'Ctrl + G: Gist',
      hotkey: 'Control+g',
      actionFile: 'gist.js'
    },
    URL_SHORTENER: {
      label: 'Ctrl + L: URL Shortener',
      hotkey: 'Control+l',
      actionFile: 'urlshortener.js'
    },
    WEATHER: {
      label: 'Ctrl + W: Weather',
      hotkey: 'Control+w',
      actionFile: 'weather.js'
    }
  },
  NOTIFICATIONS: {
    TITLE: 'L1fe4ux',
    ICON: path.join(__dirname, '/assets/images/logo.png')
  },
  TRAY: {
    ICON: 'assets/images/logo.png',
    NOTIFICATIONS: 'Show notifications',
    QUIT: 'Quit'
  }
}
