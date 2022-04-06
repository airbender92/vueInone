
import _chunk from "./lodash-example/array/_chunk";
import { fromEvent, Observable } from 'rxjs';
import { scan, throttleTime, map } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    throttleTime(2000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0))
  .subscribe(count => console.log(`Clicked ${count} times`))


const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000)
});

console.log('just before subscribe');
observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something error: ', err) },
  complete() { console.log('done'); }
});
console.log('just after subscribe')

console.log('_chunk: ', _chunk);

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});

foo.subscribe(x => {
  console.log(x);
})

foo.subscribe(y => {
  console.log(y)
})

