const person = {
  name: 'John',
  age: 30,
  hobbies: ['coding', 'programming'],
};

let favorites: string[];

favorites = ['sports'];

console.log(person.name);

for(const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
