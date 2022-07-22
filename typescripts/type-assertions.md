<!--
 * @Author: wangyunbo
 * @Date: 2022-07-20 17:22:31
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-20 17:25:20
 * @FilePath: \vueInone\typescripts\type-assertions.md
 * @Description: file content
-->
## Type assertions
```jsx
ReactDOM.render(
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);
```
One thing we'll point out in this section is the line `document.getElementById('root') as HTMLElement`. This syntax is called a __type assertion__, sometimes also called a cast. This is a useful way of telling TypeScript what the real type of an expression is when you know better than the type checker.

The reason we need to do so in this case is that getElementById's return type is `HTMLElement` | `null`. Put simply, getElementById returns null when it can't find an element with a given id. We're assuming that getElementById will actually succeed, so we need to convince TypeScript of that using the as syntax.

TypeScript also has a trailing "bang" syntax (`!`), which __removes null and undefined from the prior expression__. So we could have written `document.getElementById('root')!`, but in this case we wanted to be a bit more explicit.
