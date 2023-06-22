type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

/*      type guards      */

function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Ivan', startDate: new Date() });

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck....');
  }

  loadCargo(amount: number) {
    console.log('Driving cargo ....' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  //   if ('loadCargo' in vehicle) {
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

/*      discriminated union     */

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

/*      Type casting         */

const paragraph = document.getElementById('message');
// const userInput = <HTMLInputElement> document.getElementById('user-input')!; //v1
// const userInput = document.getElementById('user-input')! as HTMLInputElement;  //v2

// userInput.value = 'Hi there!';

const userInput = document.getElementById('user-input'); //v3

if (userInput) {
  (userInput as HTMLInputElement).value = 'Hi there';
}

/*      Index type      */

interface ErrorContainer {
  //{email: 'Not valid email, username: 'Not valid username'}
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Not a valid username',
};

/*      Function overloads      */

function add2(n1: number, n2: number): number;
function add2(n1: string, n2: string): string;
function add2(n1: number, n2: string): string;
function add2(n1: string, n2: number): string;
function add2(n1: Combinable, n2: Combinable) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

// const result = add2(1, 4);
const result = add2('Ivan', ' George');
result.split(' ');

/*      Optional Chaining       */

const fetchUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchUserData?.job?.title);

/*      Nullish Coalescing      */

const userInput2 = null;
// const userInput2 = '';


const storedData = userInput2 ?? 'DEFAULT';

console.log(storedData);
