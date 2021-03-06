'use strict'
const globalShortcut = require('electron').globalShortcut
const notifylib = require('./notifications.js')
const clipboard = require('electron').clipboard
const dialogLib = require('dialog')
const electron = require('electron')
const Tray = electron.Tray
const Menu = electron.Menu
const C = require('./constants.js')

var cbHandler = {
  module: function (actionFile) {
    try {
      return require(actionFile).handle
    } catch (e) {
      console.log('[ERROR] Missing action file: ' + actionFile)
      return undefined
    }
  },
  handle: function (action) {
    switch (action.hotkey) {
    case C.ACTIONS.CURRENCY.hotkey:
      return function () {
        cbHandler.module(action.actionFile)('EUR', 'BRL', function (result) {
          notifications.send(result)
        })
      }
    case C.ACTIONS.GIST.hotkey:
      return function () {
        cbHandler.module(action.actionFile)(clipboard.readText(), function (result) {
          notifications.send('Gist URL copied to clipboard!')
          clipboard.writeText(result)
        })
      }
    case C.ACTIONS.URL_SHORTENER.hotkey:
      return function () {
        cbHandler.module(action.actionFile)(clipboard.readText(), function (result) {
          notifications.send('Short URL copied to clipboard!')
          clipboard.writeText(result)
        })
      }
    case C.ACTIONS.PDF.hotkey:
      return function () {
        dialog.openFile(function (files) {
          dialog.saveFile(function (savePath) {
            if (savePath !== undefined) {
              cbHandler.module(action.actionFile)(files, savePath, function () {
                notifications.send('Created: ' + savePath)
              })
            } else {
              notifications.send('Invalid save path')
            }
          })
        })
      }
    case C.ACTIONS.WEATHER.hotkey:
      return function () {
        cbHandler.module(action.actionFile)('Amsterdam', function (result) {
          notifications.send(result)
        })
      }
    case C.ACTIONS.TIME.hotkey:
      return function () {
        cbHandler.module(action.actionFile)(function (result) {
          notifications.send(result)
        })
      }
    }
  }
}

// Public shortcut methods
var shortcuts = {
  registerAction: function (action) {
    cbHandler.handle(action)
    if (!globalShortcut.register(action.hotkey, cbHandler.handle(action))) {
      console.log('Registration failed: ' + action.hotkey)
    } else {
      console.log('Success: ' + action.properties.label)
    }
  },
  registerActions: function () {
    actions.map(shortcuts.registerAction)
  },
  unregisterActions: function () {
    globalShortcut.unregisterAll()
  }
}

var dialog = {
  path: undefined,
  init: function () {
    tray.app.focus()
  },
  openFile: function (cb) {
    dialog.init()
    dialogLib.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [{
          name: 'Images',
          extensions: ['jpg', 'png', 'jpeg']
        }]
      },
      function (files) {
        if (files) {
          dialog.path = files[0].substr(0, files[0].lastIndexOf('/'))
        }
        cb(files || [])
      })
  },
  saveFile: function (cb) {
    dialog.init()
    dialogLib.showSaveDialog({
      title: 'Choose your destination',
      defaultPath: dialog.path
    }, function (file) {
      cb(file)
    })
  },
  error: function (content) {
    dialogLib.showErrorBox('[!] ERROR', content)
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

var actions = require('./actions/actions.js').init(module.exports)
