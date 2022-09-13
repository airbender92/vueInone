const fs = require('fs');

function loadJSONSync(filename: string) {
  return JSON.parse(fs.readFileSync(filename))
}

console.log(loadJSONSync('good.json'))

try {
  console.log(loadJSONSync('absent.json'))
} 
catch (err) {
  console.log('absent.json error', err.message)
}

function loadJSON(filename: string, cb: (error: Error, data?: any) => void) {
  fs.readFile(filename, function (err, data) {
    if (err) cb(err);
    else cb(null, JSON.parse(data))
  })
}