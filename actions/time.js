'use strict'
const worldClock = require('world-clock')()
const sprintf = require('sprintf').sprintf

const formatTime = (timeString) => {
  let list = timeString.split(":");
  return list[0] + ":" + list[1];
}

const convert = (callback) => {
  let newYork = formatTime(worldClock.localTime('America/New_York').toString());
  let curitiba = formatTime(worldClock.localTime('America/Sao_Paulo').toString());
  callback(sprintf('New York: %s, Curitiba: %s', newYork, curitiba));
}

module.exports.handle = convert
