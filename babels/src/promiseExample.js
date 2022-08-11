export default function promiseFn() {
  setTimeout(() => {
   return Promise.resolve().finally();
  })
}