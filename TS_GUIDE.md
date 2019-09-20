# TypeScript Guide
이 글은 TypeScript로 작성된 코드의 이해를 돕기 위해 작성하였습니다.

기본적인 설명은 https://ahnheejong.gitbook.io 를 참고하였습니다.

---

## Base Type
Base Type의 4가지는 JavaScript에 이미 존재하는 타입입니다.
### 1. Boolean
```ts
const isHandsome: boolean = false
```

### 2. Number
```ts
const yourScore: number = 100
```

### 3. String
```ts
const yourPhoneNumber: string = "010-1234-5678"
const tempString: string = `How much is it?`
```

### 4. null / undefined
TypeScript는 null/undefined는 기본적으로 모든 타입에 해당합니다.

따라서 `--strictNullChecks`를 추가하지 않으면 모든 타입에 사용할 수 있습니다.(권장X)
```ts
const myWallet: null = null
const myHome: undefined = undefined
```
---
## Unique Type
TypeScript에서 제공하는 특수한 타입입니다.
### 1. any
모든 타입을 any 로 지정할 수 있고, 모든 값을 할당할 수 있습니다.

남용할 경우 TypeScript를 사용하는 이유가 없어집니다.
```ts
let anything: any = true;
anything = 3;
anything = '123'
```

### 2. void
null과 undefined만을 타입으로 가집니다.

리턴값이 없는 함수의 리턴 타입입니다.
```ts
function say(): void {
  console.log('HELLO')
}
```

### 3. never
어떤 값도 가질 수 없는 타입입니다.

주로 항상 에러를 발생시키는 함수의 리턴 타입으로 사용합니다.
```ts
function makeError(): never {
  throw new Error('I always make error!')
}
```
---

## Array & Tuple && Object
### 1. Array
타입 뒤에 대괄호를 사용하거나, 제네릭으로 작성합니다.
```ts
const oneToTen: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const oneToFive: Array<string> = ['one', 'two', 'three', 'four', 'five']
```

### 2. Tuple
원소의 타입, 수가 정확히 지정된 배열의 타입입니다.
```ts
const userInfo: [string, number, string] = ["Sohee", 28, "singer"]
```

### 3. Object
중괄호{} 로 객체 타입을 표현합니다. ',' 대신 ';' 도 사용가능합니다.

?를 붙여서 옵셔널을 사용할 수도 있습니다.

readonly를 붙이면 속성의 재할당을 막습니다.
```ts
const userInfo: { name: string, age: number } = { name: 'Sohee', age: 28 }
const myInfo: {name: string, age?: number} = { name: 'GunW' }

const phoneInfo: { readonly name: string; price: number } = { name: 'iPhone', price: 1360000 }
```
---

## Type Alias
이미 존재하는 타입의 이름을 간단한 이름으로 사용할 수 있습니다.

```ts
type UUID = string;
type Phone = string;
type Price = number;
type User = { name: string; age: number; }

function callMe(phone: Phone): void {
  console.log(`My Phone number is ${phone}!`);
}

callMe('010-1234-5678'); // 'My Phone number is 010-1234-5678'
```
---

## Function
함수는 매개변수 타입과 리턴 타입이 필요합니다.

```ts
function sayHi(name: string): void {
  console.log(`Hi, ${name}!`);
}

function sayHello(name: string): string {
  return `Hello, ${name}!`;
}
```
함수 값의 타입은 arrow function으로 정의합니다.

매개변수가 없는 함수는 매개변수를 생략하고 사용합니다.

```ts
const justNumber: () => number = () => 1;
const sumAandB = (A: number, B: number) => number = (A, B) => A + B;
```

함수도 객체와 같이 optional로 매개변수를 선택적으로 사용할 수 있습니다.

이때, optional parameter는 항상 뒤에 사용합니다.
```ts
const youtubeUrl = (url: string, title?: string) => {
  /* something */
}
```

타입을 지정하여 function overloadding도 가능합니다.

```ts
function makeDouble(str: string): string;
function makeDouble(num: number): number;
function makeDouble(arr: boolean[]): boolean[];

function makeDouble(value) {
    if (typeof value === 'string') {
        return `${value}${value}`;
    } else if (typeof value === 'number') {
        return value * 2;
    } else if (Array.isArray(value)) {
        return value.concat(value);
    }
}
```

---

## This

this타입을 명시하려면 함수의 매개변수 가장 앞에 this타입을 추가합니다.

this타입을 추가해도 함수의 인자 수는 이전과 변함없습니다.

만약, this의 타입을 void로 설정하면 함수 내에서 this접근을 막을 수 있습니다.

```ts
interface HTMLElement {
  tagName: string;
  /* ... */
}
interface Handler {
  (this: HTMLElement, event: Event, callback: () => void): void;
}
let cb: any;
const onClick: Handler = function(event, cb) {
  console.log(this.tagName);
  cb();
}
```

---

## Generic
제네릭은 타입변수를 설정합니다. 

정의된 타입 변수의 실제 타입은 실제 값이 넘어올 때 결정됩니다.
```ts
function 함수명<타입 변수>(인자 타입): 반환 타입 {
  /* something */
}

// ex
function getUserNames<T>(arr: T[]): T {
  /* 함수 본문 */
}
```
제네릭 타입의 별칭은 아래 예제와 같이 사용합니다.

```ts
type UserArray<T> = T[];
const users: UserArray<string> = ['sohee', 'dahyun', 'esom'];
```
---

## Union
어떤 타입이 가질 수 있는 경우의 수를 나열할 때 사용합니다.

유니온 타입은 OR와 의미가 비슷하며, '|'기호를 사용하여 나타냅니다.

```ts
function whatsYourAge(age?: number): number | string {
  if (age) {
    return age;
  } else {
    return 'secret';
  }
}
const yourAge: number | string = whatsYourAge('sohee')
```

---

## Intersection
여러 타입을 '&'기호를 이용하여 연결하여 나타낼 수 있습니다.

```ts
type Sohee = { likeSong: 'Sugar' };
type Dahyun = { likeSinger: 'Maroon5' };
type SingAndSong = Sohee & Dahyun;
const singsong: SingAndSong = { likeSong: 'hello', likeSinger: 'Adele' };
```
---

## Enum
유한한 경우의 수를 갖는 값의 집합을 표현합니다.

### Numeric Enum
number type의 Enum 입니다.

초기화를 하지 않으면 해당 멤버의 값은 0부터 순차적으로 증가합니다.

아래 두 열거형의 값은 동일합니다.
```ts
enum fruit {
  apple,
  banana,
  carrot
}
enum initFruit {
  apple = 0,
  banana = 1,
  carrot = 2
}
const favoriteFruit: fruit = fruit.banana; // 
```

### String Enum
string type의 Enum 입니다.

```ts
enum singer {
  Adele = 'Adele',
  Maroon5 = 'Maroon5',
  JsonMraz = 'JsonMraz'
}
```

### Union Enum
열거형의 모든 멤버가 아래 중 하나에 해당하면 유니온 열거형입니다.
* 암시적으로 초기화 된 값 (값이 표기되지 않음)
* 문자열 리터럴
* 숫자 리터럴

```ts
// union enum
enum ShapeKind {
  Circle,
  Triangle = 3,
  Square
}

// usage
type Circle = {
  kind: ShapeKind.Circle;
  radius: number;
}
type Triangle = {
  kind: ShapeKind.Triangle;
  maxAngle: number;
}
type Square = {
  kind: ShapeKind.Square;
  maxLength: number;
}
type Shape = Circle | Triangle | Square;
```

---
## interface
interface 키워드로 객체 타입처럼 특정한 shape을 갖도록 제약할 수 있습니다.

```ts
interface User {
  name: string;
  age: number;
}

interface onlyUser {
  readonly name: string;
  readonly age: number;
}
```
### Funtion interface
interface로 function type을 표현합니다.

```ts
interface getUserInfo {
  (user: User): string;
}
const getUserInfo: getUserInfo = user => {
  return user.name;
}
```

### Hybrid interface
여러 가지 속성을 갖는 객체의 타입을 표현하기 위해서 

호출 시그니처와 속성 타입을 동시에 적을 수 있습니다.

아래 예에서, Counter는 start(호출 시그니처)과 interval, reset 속성 타입을 가집니다.
```ts
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### Generic interface
interface 이름 뒤에 generic을 붙여 사용합니다.

type alias는 실제로는 새 타입을 생성하지 않지만, generic interface는 생성합니다.

꼭 type alias를 사용해야 할 때가 아니면, generic interface를 사용할 것을 권장합니다.

```ts
interface ServerResponse<data> {
  data: Data;
  status: number;
}

interface User {
  name: string;
  age: number;
}

const user: ServerResponse<User> = await getUser(id);
```

### indexable type
indexable type의 정의를 위해 대괄호([])를 이용해 index signature를 적어줘야 합니다.

```ts
interface nameHeight {
  [name: string]: number | undefined;
}
```

색인 가능 타입을 이용하면 일일이 타입을 정의하지 않을 수 있습니다.
```ts
// before applying
interface Array<T> {
  length: number;
  0?: T;
  1?: T;
  /* ... */
  Number.MAX_SAFE_INTEGER?: T;
  /* 메소드 정의 */
} 

// after applying
interface Array<T> {
  length: number;
  [index: number]?: T;
  /* 메소드 정의 */
}
```

## class
ES6의 문법에서의 class의 상위집합으로 기존의 class기능을 포함한 추가 기능이 존재합니다.

```ts
class SomeClass = {};

const something: SomeClass = new SomeClass();
```

생성자의 타입은 아래와 같이 작성합니다.

```ts
class Car {
  constructor(sound: string) {
    console.log(`${sound}!`);
  }
}

const tico: Car = new Car('BAAM'); // BAAM
const matiz: Car = new Car(); // Error
```

### static member
속성 선언 앞에 static을 붙이면 모든 클래스가 공유하는 속성을 설정할 수 있습니다.

```ts
class Counter {
  static count = 0;
  static increasement() { Counter.count += 1 };
  static getCount() {
    return Counter.count;
  }
}

Counter.increasement();
Counter.increasement();
console.log(Counter.getCount()); // 2
```

### abstract class
추상 클래스를 확장하는 서브 클래스는 모든 추상 메소드를 구현해야 합니다.

예시로 확인하겠습니다.

makeSound는 추상 메소드로서 타입외에 아무 구현이 되어 있지 않습니다.

따라서 상속받은 클래스에서 구현하지 않으면 에러가 발생합니다.

```ts
abstract class Animal {
    move(): void {
        console.log("roaming the earth...");
    }
    // abstract method
    abstract makeSound(): void;
}

class Dog extends Animal { } // Error
```

---