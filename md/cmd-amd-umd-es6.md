<!--
 * @Author: wangyunbo
 * @Date: 2022-07-21 09:37:58
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-21 09:51:36
 * @FilePath: \vueInone\md\cmd-amd-umd-es6.md
 * @Description: file content
-->
[amd-cmd-link](https://blog.sessionstack.com/how-javascript-works-the-module-pattern-comparing-commonjs-amd-umd-and-es6-modules-437f77548437)

## How JavaScript works: the module pattern + comparing CommonJS, AMD, UMD, and ES6 Modules

### Introduction
The module pattern in JavaScript is one of the most used design patterns, used for keeping groups of code independent from each other.

Modules allow us to break up different parts of our code to make it easier to maintain and understand. Thus enabling us to keep units of our code clean, separated, and organized.

Before ES6, modules were not built into the JavaScript programming language since JavaScript was initially designed for small browser scripts.

But historically, this lack of modularity led to the use of shared global variables in different parts of our codebase.

Consider the code below:
```JavaScript
// global variables
var name = 'posts';
var count = 0;
```

When the code above runs, the nameand count variables are added to the global object. Thereby, making the name and count global variables accessible to all the scripts in our app. And this lack of modularity can easily lead to buggy code because other unrelated units of our code can access and modify these variables.

Adding variables to the global object clutters the global namespace and increases the chances of name collision. Also, on the web, every user has access to the window or global object. By putting our variables and methods on the global object, we make them accessible to all our users. And this can lead to security issues. What we need is a way to encapsulate our variables and methods and only expose a defined interface to our users.

So to achieve some modularity and avoid using global variables, JavaScript developers created modules by using the setup shown below:
```JavaScript
(function () {
    // declare priate variables and/or functions
	
    return {
        // declare public variables and/or functions
})();
```

The code above is simply a closure that returns an object. The pattern above involves an anonymous function, invoked using an “immediately invoked function expression” or IIFE. Thus, creating a local scope in the process.

And this enables us to avoid using global variables and keep units of our code encapsulated and isolated. Now, we can refactor our global variables in our previous example as seen below:
```JavaScript
(function (){
    var name = 'posts';
    var count = 0;
    console.log("we have: " + count + " " + name + " in scope")
})()

console.log(("we have: " + count + " " + name + " out of scope"))
```
And when the code above runs, we get:
```JavaScript
//  we have: 0 posts in scope
//  VM469:7 Uncaught ReferenceError: count is not defined
//  at <anonymous>:7:28
```

Note the error from the second console.log statement is the behavior we want as it shows that the variable does not leak to the global scope.

If you have difficulty understanding the concept of closures and scopes used in our example above, kindly read our article that covers these topics.

In the next section, we will take a deeper dive into the module pattern in JavaScript.

### The Module pattern

A JavaScript module has three parts:

The imports or dependencies:
A module can require another module to work properly. In this case, we can import the required module as a dependency. For example, to create a React component, we need to import the React module. Also, to use utility libraries like Lodash, we need to install and import it as a dependency.

The code: This refers to the actual code of our module.
The exports: This is the interface to the module. What we export from our module is available for use to whoever imports our module.
Now using the IIFE module pattern discussed above, we can create a module that exports an interface.

Consider the code below:

```JavaScript
var numb =
(function() {
   return {
      round: function(amount) {
         return Math.round(amount + Number.EPSILON * 100) / 100;
      }
   };
}());

numb.round(1); // 1
numb.round(1.2); // 1.2
numb.round(1.2344); // 1.23
numb.round(1.233446); // 1.23
```

The module above exports an interface that rounds numbers to two decimal places. And we can further extend our module by adding more methods to the exported object to add the desired functionality.

Also, the wrapper function encapsulates data and functionalities that support our interface without being visible or modifiable by the module that consumes our interface.

Consequently giving us privacy. We can leverage this privacy by adding a cache functionality as seen below:

```JavaScript
var numb =
(function() {
        var cache = {};
        
    return {
    round: function(amount) {
        var rounded = cache[amount];

        if(!rounded) {
            rounded = cache[amount] = Math.round(amount + Number.EPSILON * 100) / 100;
        }

        return rounded;
     }
   };
}());

numb.round(123.456); // 123.456
numb.round(123.456); // 123.456 from cache
```

Why modules
Below are some of the benefits of using modules or the module pattern in JavaScript:

Reusability
Modules maximize reliability since we can import and use them from any of our modules. Thus, we can isolate and reuse our code.

Also, a module can be beneficial to more than one program, and in these cases, we can create a package.

A package can contain more than one module and can be uploaded to a service like npm, from where it can be downloaded by anyone who needs it.

Composability
Modules can easily be composed because they explicitly define their imports and exports.

Leverage open-source packages
The npm registry hosts the world’s largest collection of free, reusable modules. And any developer can download and use these modules in their application.

Encapsulation
This enables us to logically-organize different units of our code. Also, it enables us to protect private properties and methods from being accessed from other parts of our code, as we have seen in our example above.

Isolation: Understanding the whole system can be difficult and time-consuming. But when our software is modular, each of its modules can be built and maintained in isolation. In our IIFE module above, we can separate the cache into a different module and then import it for use. Consequently, we can reuse the cache module in other modules of our application that need it. In larger applications, isolation can lead to:
Less onboarding time and handovers
Fewer errors and easy debugging — because we can focus on the errors that occur in just a small area of our application.
Parallel work streams — one person can work on one module or feature.
Easy application maintenance — a module can easily be deleted and replaced by another one.
Organization: Using the modular pattern in our application, naturally organize our application, separate concerns, and prevent name collision.
CommonJS, AMD, UMD
CommonJS or CJS
CommonJS is an easy-to-use JavaScript module specification. That enables us to import modules using the require() function and export modules using module.exports. This is quite popular since it is used by Nodejs. However, it has been gaining some traction on the client-side via Browsify.

A CJS module would look like this:
```JavaScript
// app.js

//    dependencies
var dep1 = require("dep1");
var dep2 = require("dep2");

//    methods
function mycustomCode() {}

//    exposed public method (single)
module.exports = mycustomCode;
```
Pros of CommonJS

Used in Node
Avoids the use of a wrapper function as in the IFFE module.
Clean and straightforward.
Cons of CommonJS

Supports only server-side module declaration and does not work on the browser.
Works only synchronously and it is therefore blocking.
Asynchronous module definition or AMD
AMD was first released by the developers of RequireJS, a JavaScript module loader.

The AMD API is designed for the browser, it is non-blocking thus, it works asynchronously.

Also, it uses a wrapper function for encapsulation. The AMD specification defines a single function called define with the following function signature:

define(id?, dependencies?, factory);

id is an optional argument that specifies the module being defined.
Dependencies refer to an array of the module ids of the dependencies being required.
Factory refers to the callback function that should be called to instantiate the module. The returned value of this function is the exported value of the module.
Below is an example of using the AMD:
```js
define(['dep1', 'dep2'], function (dep1, dep2) {
    //methods
    function foo (){}; // public because it is returned
    function bar (){}; // public because it is returned
    function jar (){}; // private becasue it is not returned

    return {
     foo: foo,
     bar: bar
   }
});
```

Pros of AMD

Works in the browser
Loads module asynchronously
Decent community
Cons of AMD

Verbose syntax
You need a loader like RequreJS to use AMD
Client-side only
Universal module definition or UMD
The UMD is a publishing module. It is used to publish modules that can use both AMD, CJS, and other library plugin definitions.

It is more of a pattern used to configure a module to be compatible with modules that implement other module definitions such as AMD and CommonJS. It looks like this (source):

```js
(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('b'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['b'], function (b) {
      return (root.returnExportsGlobal = factory(b));
    });
  } else {
    // Global Variables
    root.returnExportsGlobal = factory(root.b);
  }
}(this, function (b) {
  // Your actual module
  return {};
}));
```

Pros of UMD

Small and concise
Works on server-side and client-side
Cons of UMD

Not easy to configure correctly
ES6 Modules
ES6 module is the built-in JavaScript module system. It draws inspiration from both CJS and AMD and aims to make users of both module definitions happy.

Similar to CJS, ES6 modules use a compact syntax with a preference for single export. And it also provides support for cyclic dependencies. Similar to AMD, ES6 module provides direct support for asynchronous loading and configurable module loading.

ES6 modules are stored in files and run in strict mode.

Also, ES6 modules are imported and exported using the import/export keywords as seen below:

```js
import Foo from "foo";

export myFunc () {} // single export.
```

Imports and Exports
ES6 modules support two types of export:

Named exports: this enables a module to export multiple functions by prefixing their names with export as seen below:
```js
// foo.js
export FuncA () {}
export FuncB () {}
export FuncC () {}
```

These exported functions can then be imported in another module by using named imports as seen below:
```js
// bar.js
import {FuncA, FuncB, FuncC} from "foo.js" // named imports

const customFunc() {} 

export default customFunc; // single export
```

Default exports: as seen in the bar.js example above the customFunc is exported using default export which supports a single export.
Also, modules can import a module that is exported using export default. For example, we can import and use the customFunc function in the bar.js example above, by using default import as seen below:
```js
// jar.js
import customFunc from "bar.js"

const myFunc() {} // do something
```

In ES6 modules, we can use both the default import and named import in the same file.

This is a common pattern used in libraries such as React.

Consider the code below:

```js
import React, {usestate, useEffect} from 'react'; // uses both drefault and named import

const myComp = () => {
	return <React.Fragment>...</React.Fragment> // jsx 
}

export default myComp;
```

In the above code, we imported the default export from the react module which is React. Also, we imported several hooks from the react module by using named imports.

Also, the ES6 module allows us to rename named imports. This can be done by using the as keyword as seen below:
```js
import defaultName, {name1 as localName1, name2} from './lib/names.js';
import {default as foo} from './lib/myLib.js';
```

In the code above, we imported name1 and renamed it to localName1. Now we can use localName1 in our application instead of name1.

Also, we imported the default export as foo thereby, renaming it.

The as keyword can also be used in a namespace import that imports the module as an object containing each named export as its property.

The namespace import also involves using a wildcard * to import all the named export from within another module.

Consider the code below:
```js
import * as foo from './lib/myLib.js';
```
This can be combined with a default import and in this case, the default import must come first.

Consider the code below:
```js
import bar, * as foo from './lib/myLib.js';
```

Pros of the ES6 module

Tree Shaking
Encapsulation
Lazy loading
Like CJS the wrapper function is implicit
Works on sever-side and client-side
Cons of the ES6 module

Not supported by all browsers
Conclusion
The module pattern in JavaScript is very popular and powerful. It is one of the must-learn JavaScript design patterns.

In this article, we have looked at different ways modules are created in JavaScript, and we ended with the ES6 module that is the language standard module definition.

Tree Shaking, Encapsulation, and Lazy Loading are highly recommended to optimize your code and make your products provide a better experience for your users.

Even if you feel like the proper decisions have been made, it’s always necessary to verify that this is indeed true and your users have a great experience with your product.

A solution like SessionStack will help you determine and further optimize the experience of your users by allowing you to replay their journeys as videos, showing you how your users actually experience your product. You can quickly determine whether your product is performing according to their expectations or not. In case you see that something is wrong, you can explore all of the technical details from the user’s browser such as the network, debug information, and everything about their environment so that you can easily understand the problem and resolve it.

With what we have covered thus far, I sure hope you are well equipped to start building modular applications.

There is a free trial if you’d like to give SessionStack a try.