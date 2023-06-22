//  Default arguments needs to be in the end
const add = (a: number, b: number = 1) => a + b;

const printOutput: (a: number | string) => void = (output) =>
  console.log(output);

const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', (event) => console.log(event));
}

printOutput(add(5));

const hobbies = ['sports', 'cooking'];
const activeHobbies = ['hiking'];

activeHobbies.push(...hobbies);

const person = {
  name: 'Max',
  age: 30,
};

const copiedPerson = { ...person };

const addNumbers = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = addNumbers(5, 10, 2, 3.7);
console.log(addedNumbers);

const [hobby1, hobby2] = hobbies;
console.log(hobby1);

const { name: userName, age } = person;
console.log(userName);
