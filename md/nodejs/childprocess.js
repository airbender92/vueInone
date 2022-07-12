/*
 * @Author: wangyunbo
 * @Date: 2022-07-07 11:15:30
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-07 14:11:54
 * @FilePath: \vueInone\md\nodejs\childprocess.js
 * @Description: file content
 */
const child_process = require('child_process')

// ChildProcess instance, which implements the EventEmitter API.
const child = child_process.spawn('pwd');

child.on('exit', function (code, signal) {
  console.log(`child process exited with code ${code} and signal ${signal}`)
})

child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`)
});

child.stderr.on('data', (data) => {
  console.error(`child stderr: \n${data}`)
})