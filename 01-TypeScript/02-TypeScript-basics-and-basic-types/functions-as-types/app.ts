function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(number: number): void {
  console.log('Result ', +number);
}


let comineValues: (a: number, b:number) => number;

comineValues = add;

// comineValues = printResult;
// console.

// comineValues = 5;

console.log(comineValues(8, 8));
