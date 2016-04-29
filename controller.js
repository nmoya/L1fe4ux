'use strict'
const globalShortcut = require('electron').globalShortcut
const notifylib = require('./notifications.js')
const electron = require('electron')
const Tray = electron.Tray
const Menu = electron.Menu
const C = require('./constants.js')

var actions = [{
  properties: {
    label: C.TRAY.EURO,
    enabled: false
  },
  hotkey: 'Control+e',
  callback: function () {
    require('./actions/currency.js').convert('EUR', 'BRL', function (result) {
      notifications.send(result)
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

// Public shortcut methods
var shortcuts = {
  registerAction: function (action) {
    if (!globalShortcut.register(action.hotkey, action.callback)) {
      console.log('Registration failed: ' + action.hotkey)
    } else {
      console.log('Success: ' + action.hotkey)
    }
  },
  registerActions: function () {
    actions.map(shortcuts.registerAction)
  },
  unregisterActions: function () {
    globalShortcut.unregisterAll()
  }
}

// Public notification methods
var notifications = {
  notificationsEnabled: true,
  setNotifications: function (state) {
    notifications.notificationsEnabled = state
  },
  send: function (content) {
    if (notifications.notificationsEnabled) {
      notifylib.notify(content)
    }
  }
}

// Public tray methods
var tray = {
  icon: undefined,
  app: undefined,
  create: function (app) {
    tray.app = app
    tray.icon = new Tray(C.TRAY.ICON)
    let contextMenu = Menu.buildFromTemplate(tray.buildTemplate(actions))
    tray.icon.setContextMenu(contextMenu)
  },
  buildTemplate: function (actions) {
    var template = []
    var separator = {
      type: 'separator'
    }
    template.push({
      label: C.TRAY.NOTIFICATIONS,
      type: 'checkbox',
      checked: true,
      click: function (item) {
        notifications.setNotifications(item.checked)
      }
    })
    template.push(separator)
    actions.map(function (action) {
      template.push(action.properties)
    })
    template.push(separator)
    template.push({
      label: C.TRAY.QUIT,
      click: tray.onQuit
    })
    return template
  },
  onQuit: function () {
    shortcuts.unregisterActions()
    tray.app.quit()
  }
}

module.exports = {
  shortcuts: shortcuts,
  notifications: notifications,
  tray: tray
}
