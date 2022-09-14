
It depends entirely on what type the fulfillment value of the promise will be. For instance, if the promise will be fulfilled with a number, then the type would be Promise<number>. For example:
```js
function a() : Promise<number> {
    return new Promise((resolve, reject) => {
        doSomeCallbackBasedThing((err: Error | null, result: number) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}
```
## If it is fulfilled with undefined via resolve() with no argument, typically you'd write `Promise<void>`.

Often, you don't have to write the type explicitly at all; TypeScript can often infer it from the code in the function.

Re your edit: You'd use Promise<x> where x is the type of the code parameter you receive in your handler for the close event.