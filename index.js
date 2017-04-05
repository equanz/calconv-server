// require
const fs = require('fs')
const Git = require('nodegit')
const async = require('async')
const express = require('express')
const app = express()

// global const
const calconv_repo = 'https://github.com/rikyuusima/calconv.git'
const port = 3000

async.waterfall([
  (callback) => {
    // calconvのクローン
    if(! fs.statSync('calconv').isDirectory()){
      Git.Clone(calconv_repo, 'calconv')
    }
    callback(null)
  },
  (callback) => {
    // expressのlisten
    app.listen(port)

    callback(null)
  }
])

// CSVをレスポンス
app.get('/nit-tsuyama/csv/', (req, res) => {
  res.sendFile(__dirname + '/calconv/nit-tsuyama/schedule.csv')
})

// iCalをレスポンス
app.get('/nit-tsuyama/ical/', (req, res) => {
  res.sendFile(__dirname + '/calconv/nit-tsuyama/schedule.ics')
})

// XMLをレスポンス
app.get('/nit-tsuyama/XML/', (req, res) => {
  res.sendFile(__dirname + '/calconv/nit-tsuyama/schedule.xml')
})
