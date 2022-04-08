[ts-call-signature](https://levelup.gitconnected.com/typescript-type-signatures-for-any-function-c21a22596d1c)

![ts-call-signature](../images/ts-Call-Signatures.png)

```ts function overload
function add(a: number, b: number, c: number): number;
function add(a: number, b: number): any;
function add(a: string, b: string): any;

function add(a: any, b: any, c?: any): any {
  if (c) {
    return a + c;
  }
  if (typeof a === 'string') {
    return `a is ${a}, b is ${b}`;
  } else {
    return a + b;
  }
}
```
```ts
interface IFoo
{
    bar: {
        (s: string): number;
        (n: number): string;
    }
}
// Then the following:

var foo1: IFoo = ...;

var n: number = foo1.bar('baz');     // OK
var s: string = foo1.bar(123);       // OK
var a: number[] = foo1.bar([1,2,3]); // ERROR
```