With Typescript 4.1, it can be done!

```ts
enum Weekday {
  MONDAY = 'mon',
  TUESDAY = 'tue',
  WEDNESDAY = 'wed'
}

type WeekdayType = `${Weekday}`;
// type WeekdayType = 'mon' | 'tue' | 'wed'
```
### tips:
Caveat: This only works with string enum values, not number enum values.