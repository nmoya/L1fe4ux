'use strict'
var PDFDocument = require('pdfkit')
var fs = require('fs')

var pdfCreator = function (files, savePath, callback) {
  var doc = new PDFDocument()
  doc.pipe(fs.createWriteStream(savePath))
  for (var i = 0; i < files.length; i++) {
    doc.image(files[i], 0, 0, {
      fit: [doc.page.width, doc.page.height]
    })
    if (i !== files.length - 1) {
      doc.addPage()
    }
  }
  doc.end()
  callback()
}

module.exports.handle = pdfCreator
