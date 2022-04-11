
https://github.com/TypeStrong/ts-node/issues/935
```js
package.json: {
  "script": {
    // 单独使用node执行ts文件
    "single": "node --loader ts-node/esm %npm_config_filename%"
  }
}

npm run single --filename xxxxx
```
remove  `"type": "module"` 
(for example if you're using import statements in your .ts which allows the inference of types from modules), then you can use the following option in 
tsconfig.json:
```js

{
  "compilerOptions": {
    "esModuleInterop": true,
  }
}
```
And then you can start the server with the config using ts-node.

Install:
```js
npm install -g ts-node
// Run:

ts-node my_server.ts
```