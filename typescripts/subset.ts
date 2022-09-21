// https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c

interface Person {
  id: number;
  name: string;
  lastName: string;
  load: () => Promise<Person>
}

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]:
    Base[Key] extends Condition ? Key : never
}

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>

type SubType2<Base, Condition> = Pick<Base, {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}[keyof Base]>;


// usage:
interface Persion {
  id: number;
  name: string;
  lastName: string;
  load: () => Promise<Persion>;
}

type JsonPrimitive = SubType<Person, number | string>;

type JsonComplex = SubType<Person, object>;


interface PersonLoader {
  loadAmountOfPeople: () => number;
  loadPeople: (city: string) => Person[];
  url: string;
}

type Callable = SubType<PersonLoader, (_: any) => any>


//!!!*最终方案* to resolve Nullable 
type PickWithType<Base, Condition> = Pick<Base, {
  [Key in keyof Base]: Condition extends Extract<Base[Key], Condition> ? Key : never
}[keyof Base]>

type demoPickWithType = PickWithType<{
  street: string | null;
  city: number;
  id: string
}, null | string>

type Nullable = PickWithType<{
  street: string | null;
}, null>

// 从联合（union）类型T从抽取出extends U类型的，重新组成新的类型
type To = Extract<'a' | 'b' | number | boolean, string | boolean>