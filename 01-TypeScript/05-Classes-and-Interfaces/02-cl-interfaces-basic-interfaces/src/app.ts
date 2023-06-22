// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

interface Named {
  // readonly name: string;
  readonly name?: string;
  outputName?: string; //optional parameter
}

// extend Greets
interface Greets extends Named {
  greet(phrase: string): void;
}

class Person implements Greets {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi');
    }
  }
}

// let user1: Person;
let user1: Greets;
let user2: Greets;

user1 = new Person('Max');
user2 = new Person();

user1.greet('Hi there - I am');
console.log(user1);
console.log(user2);

/*    interface function     */
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => n1 + n2;

console.log(add(2, 5));
