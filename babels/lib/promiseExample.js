"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promiseFn;

function promiseFn() {
  setTimeout(() => {
    return Promise.resolve().finally();
  });
}