/*
 * @Author: wangyunbo
 * @Date: 2022-07-07 16:15:32
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-07 16:22:46
 * @FilePath: \vueInone\md\nodejs\eventemitter.js
 * @Description: file content
 */
const EventEmitter = require('events');
const fs = require('fs');

function fileSize(fileName, cb) {
  if (typeof fileName !== 'string') {
    return cb(new TypeError('argument should be string'))
  }

  fs.stat(fileName, (err, stats) => {
    if (err) { return cb(err) }
    
    cb(null, stats.size);
  })
}