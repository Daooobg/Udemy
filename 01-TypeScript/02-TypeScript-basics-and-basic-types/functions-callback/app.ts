function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(number: number): void {
  console.log('Result ', +number);
}

function addAndHandle(n1: number, n2: number, cb: (n: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
});
