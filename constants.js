const path = require('path')

module.exports = {
  NOTIFICATIONS: {
    TITLE: 'L1fe4ux',
    ICON: path.join(__dirname, '/assets/images/logo.png')
  },
  TRAY: {
    ICON: 'assets/images/logo.png',
    NOTIFICATIONS: 'Show notifications',
    EURO: 'Control + E: Euro',
    GIST: 'Control + G: Gist',
    QUIT: 'Quit'
  }
}
