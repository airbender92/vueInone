 # Cannot Find Module 'XXX.scss' or Its Corresponding Type Declarations

## Question
When using CSS Module in Typescript + Webpack + Sass projects, you can use CSS modules normally, but vscode always prompts cannot find module'XXX.scss' or its corresponding type declarations.

## Solution
### Option 1
First of all, make sure that webpack and sass have been able to recognize the CSS Module, please refer to the webpack official website configuration.

Separating Interoperable CSS-only and CSS Module features

Configure `d.ts`

Here comes the important part, we should pay attention to the configuration of `two d.ts` files

Main file index.d.ts
```ts
declare module'*.scss' {
    const content: {[key: string]: any}
    export = content
}
```
Add another `typings.d.ts` file to `the same level directory`
```ts
declare module'*.scss';
```
After this configuration, my problem has been solved, and neither VSCODE nor Node command line interface will report an error, and it can match normally.