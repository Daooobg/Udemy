// const button = document.querySelector('button')!;

const button = document.querySelector('button');

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1+ n2
  }  
  return;
}

// Add event listener
if (button) {
  button.addEventListener('click', () => {
    console.log('Cliked!');
  });
}

