const toString = {}.toString;

export default function isType(value: any, type: string):boolean {
  return toString.call(value) === `[object ${type}]`
}