interface IteratorResult2<T> {
  done: boolean;
  value: T;
}

interface Iterator<T>{
  next(value?: any): IteratorResult2<T>;
  return?(value?: any): IteratorResult2<T>;
  throw?(e?: any): IteratorResult2<T>;
}

class Component {
  constructor(public name: string) {}
}

class Frame implements Iterator<Component> {
 
  constructor(public name: string, public components: Component[]) { }

  [Symbol.iterator]() {
    let pointer = 0;
    let components = this.components;

    return {
      next(): IteratorResult2<Component> {
        if (pointer < components.length) {
          return {
            done: false,
            value: components[pointer++]
          }
        } else {
          return {
            done: true,
            value: null
          }
        }
      }
    }
  }
}

let frame = new Frame("Door", [
  new Component("top"),
  new Component('bottom'),
  new Component("left"),
  new Component("right")
]);

for (let cmp of frame) {
  console.log(cmp)
}