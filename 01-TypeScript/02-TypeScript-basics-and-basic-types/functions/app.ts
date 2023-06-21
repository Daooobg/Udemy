function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(number: number): void {
  console.log('Result ', + number);
}

printResult(add(5, 12));
console.log(printResult(add(5, 12)));
