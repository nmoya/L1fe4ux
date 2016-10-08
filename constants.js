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
      label: 'Ctrl + K: URL Shortener',
      hotkey: 'Control+k',
      actionFile: 'urlshortener.js'
    },
    PDF: {
      label: 'Ctrl + P: PDF Creator',
      hotkey: 'Control+p',
      actionFile: 'pdfcreator.js'
    },
    WEATHER: {
      label: 'Ctrl + W: Weather',
      hotkey: 'Control+w',
      actionFile: 'weather.js'
    },
    TIME: {
      label: 'Ctrl + A: Time around the world.',
      hotkey: 'Control+a',
      actionFile: 'time.js'
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
