import moment from 'moment';

export function test() {
  const m1 = moment().format('LLL');
  const m2 = moment().fromNow();
  return `The moment is ${m1},which was ${m2}`
}