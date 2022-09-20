[原文](https://www.reddit.com/r/typescript/comments/v19vuo/what_does_t_extends_object_e_extends_object_t_mean/)

What does <T extends object, E extends object = T> mean?
I saw it in the docs for zustand (a simpler version of redux).

The full snippet:
```ts
export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;       
``` 

`T` and `E` are both types that can take any `object` type. The `“= T”` at the end means that if you only provide one type for the generics then the second one is identical to the first one.

The `“T extends E ? E : E & T”` is checking that in the case where two types were provided, does the second one extend from the first (which means that a value with type E can be assigned to type T without an error). If it’s compatible then the return type can just be E, because it’s assignable to both. If they aren’t compatible then the return type is both types merged together.