<!--
 * @Author: wangyunbo
 * @Date: 2022-07-13 17:07:23
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 18:08:48
 * @FilePath: \vueInone\scss\atRules.md
 * @Description: file content
-->
- [*@use*](#use) loads mixins, functions, and variables from other Sass stylesheets, and combines CSS from multiple stylesheets together.

- [*@forward*](#forward) loads a Sass stylesheet and makes its mixins, functions, and variables available when your stylesheet is loaded with the @use rule.

- *@import* extends the CSS at-rule to load styles, mixins, functions, and variables from other stylesheets.

- *@mixin* and *@include* makes it easy to re-use chunks of styles.

- *@function* defines custom functions that can be used in SassScript expressions.

- *@extend* allows selectors to inherit styles from one another.

- *@at-root* puts styles within it at the root of the CSS document.

- *@error* causes compilation to fail with an error message

- *@warn* prints a warning without stopping compilation entirely.

- *@debug* prints a message for debugging purposes.

- Flow control rules like *@if*, *@each*, *@for*, and *@while* control whether or how many times styles are emitted.

## @use
The simplest *@use* rule is written `@use "<url>"`, which loads the module at the given URL. __Any styles loaded this way will be included exactly once in the compiled CSS output, no matter how many times those styles are loaded.__
```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// style.scss
@use 'foundation/code';
@use 'foundation/lists';
```

### Loading Members
You can access variables, functions, and mixins from another module by writing `<namespace>.<variable>`, `<namespace>.<function>()`, or `@include <namespace>.<mixin>()`. By default, the namespace is just the last component of the module’s URL.

Members (variables, functions, and mixins) loaded with @use are only visible in the stylesheet that loads them. Other stylesheets will need to write their own @use rules if they also want to access them. This helps make it easy to figure out exactly where each member is coming from. If you want to load members from many files at once, you can use the @forward rule to forward them all from one shared file.

> Because `@use` adds namespaces to member names, it’s safe to choose very simple names like $radius or $width when writing a stylesheet. This is different from the old @import rule, which encouraged that users write long names like $mat-corner-radius to avoid conflicts with other libraries, and it helps keep your stylesheets clear and easy to read!
```scss
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners";

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```

### Choosing a Namespace
By default, a module’s *namespace* is just the last component of its URL without a file extension. However, sometimes you might want to choose a different namespace—you might want to use a shorter name for a module you refer to a lot, or you might be loading multiple modules with the same filename. You can do this by writing `@use "<url>" as <namespace>`.
```scss
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners" as c;

.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

### Private Members
As a stylesheet author, you may not want all the members you define to be available outside your stylesheet. Sass makes it easy to define a private member by starting its name with either - or _. These members will work just like normal within the stylesheet that defines them, but they won’t be part of a module’s public API. That means stylesheets that load your module can’t see them!
```scss
// src/_corners.scss
$-radius: 3px;

@mixin rounded {
  border-radius: $-radius;
}

// style.scss
@use "src/corners";

.button {
  @include corners.rounded;

  // This is an error! $-radius isn't visible outside of `_corners.scss`.
  padding: 5px + corners.$-radius;
}
```

### Configuration
A stylesheet can define variables with the !default flag to make them configurable. To load a module with configuration, write `@use <url>` with `(<variable>: <value>, <variable>: <value>)`. The configured values will override the variables’ default values.
```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

### With Mixins
```scss
// _library.scss
$-black: #000;
$-border-radius: 0.25rem;
$-box-shadow: null;

/// If the user has configured `$-box-shadow`, returns their configured value.
/// Otherwise returns a value derived from `$-black`.
@function -box-shadow() {
  @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
}

@mixin configure($black: null, $border-radius: null, $box-shadow: null) {
  @if $black {
    $-black: $black !global;
  }
  @if $border-radius {
    $-border-radius: $border-radius !global;
  }
  @if $box-shadow {
    $-box-shadow: $box-shadow !global;
  }
}

@mixin styles {
  code {
    border-radius: $-border-radius;
    box-shadow: -box-shadow();
  }
}
// style.scss
@use 'library';

@include library.configure(
  $black: #222,
  $border-radius: 0.1rem
);

@include library.styles;
```


### Reassigning Variables
After loading a module, you can reassign its variables.
```scss
// _library.scss
$color: red;
// _override.scss
@use 'library';
library.$color: blue;
// style.scss
@use 'library';
@use 'override';
@debug library.$color;  //=> blue
```

### Partials
As a convention, Sass files that are only meant to be loaded as modules, not compiled on their own, *begin with _ (as in _code.scss)*. These are called partials, and __they tell Sass tools not to try to compile those files on their own. You can leave off the _ when importing a partial__.

### Index Files

If you write an _index.scss or _index.sass in a folder, the index file will be loaded automatically when you load the URL for the folder itself.
```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}
// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}
// foundation/_index.scss
@use 'code';
@use 'lists';
// style.scss
@use 'foundation';
```

### Loading CSS permalinkLoading CSS
In addition to loading .sass and .scss files, Sass can load plain old .css files.

### __Differences From @import__
The @use rule is intended to replace the old @import rule, but it’s intentionally designed to work differently. Here are some major differences between the two:

- @use only makes variables, functions, and mixins available within the scope of the current file. It never adds them to the global scope. This makes it easy to figure out where each name your Sass file references comes from, and means you can use shorter names without any risk of collision.

- @use only ever loads each file once. This ensures you don’t end up accidentally duplicating your dependencies’ CSS many times over.

- @use must appear at the beginning your file, and cannot be nested in style rules.

- Each @use rule can only have one URL.

- @use requires quotes around its URL, even when using the indented syntax.

## @forward