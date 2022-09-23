// extending interfaces
export interface IPartialPointX { x: number; }
interface IPoint extends IPartialPointX { y: number; }

// extending types
type TPartialPointX = { x: number; }
type TPoint = TPartialPointX & { y: number }

// Interface exnteds type
type TPartialPointX1 = { x: number; }
interface Point1 extends TPartialPointX1 { y: number; }

// type alias extends interface
interface IPartialPointX2 { x: number; }
type TPoint2 = IPartialPointX2 & { y: number; }

const pointA: IPoint = {
  x: 1,
  y:1
}

const point2: TPoint2 = {
  x: 1,
  y: 2
}


// implementing the Interface
class SomePoint implements IPoint {
  x = 1;
  y = 2;
}

// implementing the type alias
class Somepoint2 implements TPoint {
  x = 1;
  y = 2;
}

type PartialPoint3 = { x: number; } | { y: number; }

// this is the only thing you can't do: implement a union type
class SomePartialPointC implements PartialPoint3 {
  x = 1;
  y = 2;
} 

/**
 * The only extra feature Interfaces bring to the table (that Type aliases don’t), is “declaration merging” which means you can define the same interface several times and with each definition, the properties get merged
 */
interface IP { x: number } // declaration #1
interface IP { y: number } // declaration #2

// these tow declarations becomes:
// interface IP { x:number; y: number }
const ip: IP = {
  x: 1,
y: 1
} 