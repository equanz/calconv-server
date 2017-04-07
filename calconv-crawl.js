// npm require
const PythonShell = require('python-shell')

// moduleオブジェクト
var crawl = {}

crawl.crawl = (location, year) => {
  let shell = new PythonShell('./calconv/' + location + '/calconv.py', {mode: 'text'})
  shell.send(year.toString())
}

// moduleのexport
module.exports = crawl
