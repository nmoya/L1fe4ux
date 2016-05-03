const C = require('../constants.js')

var Action = function (label, hotkey, actionFile) {
  var action = {
    properties: {
      label: label,
      enabled: false
    },
    hotkey: hotkey,
    actionFile: './actions/' + actionFile
  }
  return action
}

var init = function () {
  var actions = []
  for (var key in C.ACTIONS) {
    actions.push(Action(C.ACTIONS[key].label, C.ACTIONS[key].hotkey, C.ACTIONS[key].actionFile))
  }
  return actions
}

module.exports.init = init
