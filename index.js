// npm require
const fs = require('fs')
const Git = require('nodegit')
const async = require('async')
const schedule = require('node-schedule')
const express = require('express')
const app = express()

// module require
const crawl = require('./calconv-crawl')

// global const
const calconv_repo = 'https://github.com/rikyuusima/calconv.git'
const port = 3000
const conv_name = 'nit-tsuyama'
const year = 2017

async.waterfall([
  (callback) => {
    // calconvのクローン
    if(! isDirectory('calconv')){
      Git.Clone(calconv_repo, 'calconv')
    }
    callback(null)
  },
  (callback) => {
    crawl.crawl(conv_name, year)
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
  res.sendFile(__dirname + '/schedule.csv')
})

// iCalをレスポンス
app.get('/nit-tsuyama/ical/', (req, res) => {
  res.sendFile(__dirname + '/schedule.ics')
})

// 定期クロール
var job = schedule.scheduleJob({
  date: 1
}, () => {
  crawl.crawl(conv_name, year)
})

// @pathに一致するディレクトリの存在確認
function isDirectory(path){
  try{
    fs.statSync(path)
    return true
  }
  catch(e){
    return false
  }
}
