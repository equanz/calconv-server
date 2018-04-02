// npm require
const schedule = require('node-schedule')
const express = require('express')
const app = express()

// module require
const crawl = require('./calconv-crawl')

// global const
const calconv_repo = 'https://github.com/rikyuusima/calconv.git'
const port = process.env.PORT || 3000
const conv_name = 'nit-tsuyama'
const year = 2018

// crawl and save to file
crawl.crawl(conv_name, year)

app.listen(port, () => {
  console.info(port + " open!")
})

// response CSV
app.get('/nit-tsuyama/csv/', (req, res) => {
  res.sendFile(__dirname + '/schedule.csv')
})

// response iCal
app.get('/nit-tsuyama/ical/', (req, res) => {
  res.sendFile(__dirname + '/schedule.ics')
})

// crawl batch
var job = schedule.scheduleJob({
  date: 1
}, () => {
  crawl.crawl(conv_name, year)
})

