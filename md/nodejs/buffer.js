/*
 * @Author: wangyunbo
 * @Date: 2022-07-07 10:37:54
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-07 11:07:47
 * @FilePath: \vueInone\md\nodejs\buffer.js
 * @Description: file content
 */
// https://medium.com/free-code-camp/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8

// Binary is simply a set or a collection of 1s and 0s.
// example: 10, 01, 001, 1110, 00101011
// each number in a binary, each 1 and 0 in a set are called a Bit

// 10 bytes
const buf1 = Buffer.alloc(10);

const buf2 = Buffer.from("Hello buffer");

buf1.toJSON();
console.log('buf1_json', buf1.toJSON());

buf2.toJSON();
console.log('buf2_json', buf2.toJSON());

console.log('buf1_size', buf1.length);
console.log('buf2_size', buf2.length);

buf1.write("Buffer really rocks!");

console.log('decode_buf1', buf1.toString());