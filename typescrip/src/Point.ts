/*
 * @Author: wangyunbo
 * @Date: 2022-07-31 15:00:44
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-31 16:03:13
 * @Description: file content
 */
class Point {
  constructor(public x: number, public y: number) { }
  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y)
  }
}

const p1 = new Point(0, 10);
const p2 = new Point(10, 20);
const p3 = p1.add(p2);
console.log(p3)

class Point3D extends Point {
  z: number;
  constructor(x: number, y: number, z: number) {
    super(x, y);
    this.z = z;
  }
  add(point: Point3D) {
    const point2D = super.add(point);
    return new Point3D(point2D.x, point2D.y, this.z + point.z);
  }
}

class Something {
  static instances = 0;
  constructor() {
    Something.instances++;
  }
}

const s1 = new Something();
const s2 = new Something();
console.log(Something.instances);

class Foo {
  constructor(public x: number) { }
}

class FooBase {
  public x: number;
  private y: number;
  protected z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const foo = new FooBase(1,1,1);
foo.x;

class FooChild extends FooBase {
  constructor() {
    super(1,1,1);
    this.x;
    this.z;
  }
}
const fooChild = new FooChild();
fooChild.x;