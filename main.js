'use strict'
const electron = require('electron')
const app = electron.app
const Controller = require('./controller.js')

app.on('ready', function () {
  app.dock.hide()
  Controller.tray.create(app)
  Controller.shortcuts.registerActions()
})
