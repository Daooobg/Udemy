/*      First Class Decorator       */

// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

// @Logger
// class Person {
//   name = 'Max';

//   constructor() {
//     console.log('Create person object...');
//   }
// }

// const person = new Person();
// console.log(person);

/*      Decorators Factories        */

function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log('Rendering template');
    const el = document.getElementById(hookId);
    const p = new constructor();
    if (el) {
      el.innerHTML = template;
      el.querySelector('h1')!.textContent = p.name;
    }
  };
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Create person object...');
  }
}

const person = new Person();
console.log(person);

/*      Property Decorators     */

function Log(target: any, propertyName: string | symbol) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// function Log3(
//   target: any,
//   name: string | symbol,
//   descriptor: PropertyDescriptor
// ) {
//   console.log('Method decorator');
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | symbol, position: number) {
  console.log('Parameter decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}

//
class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

/*      Returning (and changing) a Class in a Class Decorator       */

function WithTemplate2(template: string, hookId: string) {
  return function <T extends { new (...arg: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering template');
        const el = document.getElementById(hookId);
        if (el) {
          el.innerHTML = template;
          el.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}
@WithTemplate2('<h1>My Person Object</h1>', 'app2')
class Person2 {
  name = 'Max2';

  constructor() {
    console.log('Create person2 object...');
  }
}

const person2 = new Person2();
console.log(person2);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'Its work';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);

/*      Validation with Decorators      */

// interface ValidatorConfig {
//   [property: string]: {
//     [validateProperty: string]: string[];
//   };
// }

// const registeredValidators: ValidatorConfig = {};

// function Require(target: any, propertyName: string) {
//   registeredValidators[target.constructor.name] = {
//     [propertyName]: ['required'],
//   };
// }

// function PositiveNumber(target: any, propertyName: string) {
//   registeredValidators[target.constructor.name] = {
//     [propertyName]: ['positive'],
//   };
// }

// function validate(obj: any) {
//   const objValidatorConfig = registeredValidators[obj.constructor.name];
//   if (!objValidatorConfig) {
//     return true;
//   }
//   let isValid = true;
//   for (const prop in objValidatorConfig) {
//     console.log(prop);
//     for (const validator of objValidatorConfig[prop]) {
//       switch (validator) {
//         case 'required':
//           isValid = isValid && !!obj[prop];
//           break;
//         case 'positive':
//           isValid = isValid && obj[prop] > 0;
//           break;
//       }
//     }
//   }
//   return isValid;
// }

// class Course {
//   @Require
//   title: string;
//   @PositiveNumber
//   price: number;

//   constructor(t: string, p: number) {
//     this.price = p;
//     this.title = t;
//   }
// }

// const courseForm = document.querySelector('form')!;
// courseForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const titleEl = document.getElementById('title') as HTMLInputElement;
//   const priceEl = document.getElementById('price') as HTMLInputElement;

//   const title = titleEl.value;
//   const price = +priceEl.value;

//   const createCourse = new Course(title, price);

//   if (!validate(createCourse)) {
//     alert('Invalid input');
//     return;
//   }
//   console.log(createCourse);
// });


interface ValidatorConfig {
    [property: string]: {
      [validatableProp: string]: string[]; // e.g. ['required', 'positive']
    };
  }
  
  const registeredValidators: ValidatorConfig = {};
  
  function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [
        ...registeredValidators[target.constructor.name][propName],
        'required',
      ],
    };
  }
  
  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [
        ...registeredValidators[target.constructor.name][propName],
        'positive',
      ],
    };
  }
  
  function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
      return true;
    }
  
    let isValid = true;
    for (const prop in objValidatorConfig) {
      for (const validator of objValidatorConfig[prop]) {
        switch (validator) {
          case 'required':
            isValid = isValid && !!obj[prop];
            break;
          case 'positive':
            isValid = isValid && obj[prop] > 0;
            break;
        }
      }
    }
    return isValid;
  }
  
  class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;
  
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }
  
  const courseForm = document.querySelector('form')!;
  
  courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
  
    const title = titleEl.value;
    const price = +priceEl.value;
  
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
      alert('Invalid input, please try again!');
      return;
    }
    console.log(createdCourse);
  });