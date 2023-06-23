/*      Built-in Generics       */

// const names: Array<string> = [];

// names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done!');
//   }, 2000);
// });

/*      Creating Generics Function      */

// function merge<T extends object, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// const mergedObj1 = merge({ name: 'Max' }, { age: 30 });
// // this is what is happening below
// //   const mergedObj1 = merge<{name:string}, {age: number}>({ name: 'Max' }, { age: 30 });
// const mergedObj2 = merge({ name: 'Max', hobbies: ['sport'] }, { age: 30 });
// console.log(mergedObj1.name); // OK
// console.log(mergedObj2.age); // OK

/*      Working with Constraints        */

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

//   const mergedObj = merge({ name: 'Max', hobbies: ['sport'] }, 30 );
const mergedObj = merge({ name: 'Max', hobbies: ['sport'] }, { age: 30 });

console.log(mergedObj); // OK

/*      Another Generic Function        */

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Hot no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['sport', 'cooking']));

/*      The "keyof" Constraint      */

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Ivan' }, 'name');

/*      Generic Classes     */

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Ivan');
textStorage.addItem('Victor');
console.log(textStorage.getItems());

textStorage.removeItem('Ivan');

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(4);
numberStorage.addItem(2);
numberStorage.removeItem(2);

console.log(numberStorage.getItems());

//  //Is not work on objects
// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: 'George' });
// objStorage.addItem({ name: 'Victor' });
// objStorage.removeItem({ name: 'George' });

// console.log(objStorage.getItems());

/*      Generic Utility Types       */

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoals(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names = ['Max', 'Anna'];
names.push('Ivan');
