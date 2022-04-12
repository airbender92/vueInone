## Variables
```less
@link-color: #428bca;
@link-color-hover: darken(@link-color, 10%);

// Usage
a, .link { color: @link-color }
a:hover{
  color: @link-color-hover
}
```

## Variable Interpolation
```less
// Variables
@my-selector: banner;
// Usage
.@{my-selector} {
  font-weight: bold;
  line-height: 40px
}
// Compiles to:
.banner {
  font-weight: bold;
  line-height: 40px
}
```
## URLS
```less
// Variables
@images: '../img';
// Usage
body {
  color: #444;
  background: url("@{images}/white-sand.png")
}
```

## Import Statements
Syntax: @import "@{themes}/tidal-wave.less"
```less
// Variables
@themes: "../../src/themes";
// Usage
@import "@{themes}/tidal-wave.less"
```

## Variable Variables
in less, you can define a variable's name using another variable
```less
@primary: green;
@secondary: blue;

.section {
  @color: primary;

  .element {
    color: @@color;
  }
}
// compiles to:
.section .element {
  color: green;
}
```

## Lazy Evaluation
```less
.header{
  --color: white;
  color: var(--color); // the color is black
  --color: black;
}
```

## Properties as Variables v3.0.0
treat properties like variables using the `$prop` syntax;
```less
.widget{
  color: #efefef;
  background-color: $color;
}
// Compiles to:
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

## Default Variables
```less
// library
@base-color: green;
@dark-color: darken(@base-color, 10%);
// use of library
@import "library.less";
@base-color: red;
// @base-color is overridden and @dark-color is a dark red.
```

## Parent Selectors
Referencing parent selectors with `&`;
Note that & represents all parent selectors (not just the nearest ancestor);

## Changing Selector Order
```less
.header {
  .menu {
    border-radius: 5px;
    .no-borderradius & {
      background-image: url('images/button-background.png');
    }
  }
}
//The selector .no-borderradius & will prepend .no-borderradius to its parent .header .menu to form the.no-borderradius .header .menu on output:
// output:
.header .menu {
  border-radius: 5px;
}
.no-borderradius .header .menu {
  background-image: url('images/button-background.png');
}
```

## Mixins
```less
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}
// compiled to:
.a, #b {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}
```
## Mixins With Parentheses
If you want to create a mixin but you do not want that mixin to be in your CSS output, put parentheses after the mixin definition.
```less
.my-mixin {
  color: black;
}
.my-other-mixin(){
  background: white;
}
.class {
  .my-mixin();
  .my-other-mixin();
}
// outputs:
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

## Selectors in Mixins
```less
.my-hover-mixin(){
  &:hover{
    border: 1px solid red;
  }
}
button{
  .my-hover-mixin();
}
// Outputs:
button:hover{
  border: 1px solid red;
}
```

## Namespaces
```less
#my-library {
  .my-mixin() {
    color: black;
  }
}
// which can be used like this
.class {
  #my-library.my-mixin();
}
```

## Guarded Namespaces
If a namespace has a guard, mixins defined by it are used only if the guard condition returns true
```less
#namespace when (@mode = huge) {
  .mixin {}
}
#namespace{
  .mixin() when (@mode = huge) {}
}
```

## The !important keyword
```less
.foo (@bg: #f5f5f5; @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
// output:
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

## Parametric Mixins
```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
#header{
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```
## Named Parameters
```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
// compiles to 
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

## The @arguments Variable
```less
.box-shadow(@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px, 5px);
}
// compile to:
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

## Advanced Arguments and the @rest Variable
```less
.mixin(...) {        // matches 0-N arguments
.mixin() {           // matches exactly 0 arguments
.mixin(@a: 1) {      // matches 0-1 arguments
.mixin(@a: 1, ...) { // matches 0-N arguments
.mixin(@a, ...) {    // matches 1-N arguments

.mixin(@a, @rest...) {
   // @rest is bound to arguments after @a
   // @arguments is bound to all arguments
}

```

## Using Mixins as Functions
Starting in Less 3.5, you can use property/variable accessors to select a value from an evaluated mixin's rules. This can allow you to use mixins similar to functions.
```less
.average(@x, @y) {
  @result: ((@x + @y) / 2);
}

div {
  // call a mixin and look up its "@result" value
  padding: .average(16px, 50px)[@result];
}
// output:
div {
  padding: 33px;
}
```

## Recursive Mixins
```less
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1));    // next iteration
  width: (10px * @counter); // code for each iteration
}

div {
  .loop(5); // launch the loop
}
// compiles to:
div {
  width: 10px;
  width: 20px;
  width: 30px;
  width: 40px;
  width: 50px;
}
```
A generic example of using a recursive loop to generate CSS grid classes:
```less
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
// Output:
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

## Mixin guard
```less
.mixin(@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin(@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin(@a) {
  color: @a;
}
// usage
.class1 { .mixin(#ddd) }
.class2 { .mixin(#555) }
// output
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
```

## Aliasing Mixins
```less
#theme.dark.navbar {
  .colors(light) {
    primary: purple;
  }
  .colors(dark) {
    primary: black;
    secondary: grey;
  }
}

.navbar {
  @colors: #theme.dark.navbar.colors(dark);
  background: @colors[primary];
  border: 1px solid @colors[secondary];
}
// output
.navbar {
  background: black;
  border: 1px solid grey;
}
```
```less
#library() {
  .colors() {
    background: green;
  }
}
.box {
  @alias: #library.colors();
  @alias();
}
// output
.box {
  background: green;
}
```

## Scoping
```less
@detached-ruleset: {
  caller-variable: @caller-variable; // variable is undefined here
  .caller-mixin(); // mixin is undefined here
};

selector {
  // use detached ruleset
  @detached-ruleset(); 

  // define variable and mixin needed inside the detached ruleset
  @caller-variable: value;
  .caller-mixin() {
    variable: declaration;
  }
}
// output:
selector {
  caller-variable: value;
  variable: declaration;
}
```
Variable and mixins accessible from definition win over those available in the caller:
```less
@variable: global;
@detached-ruleset: {
  // will use global variable, because it is accessible
  // from detached-ruleset definition
  variable: @variable; 
};

selector {
  @detached-ruleset();
  @variable: value; // variable defined in caller - will be ignored
}
// output:
selector {
  variable: global;
}
```