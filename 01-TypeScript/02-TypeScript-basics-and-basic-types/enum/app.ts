enum Role {'ADMIN', 'READ ONLY', 'AUTHOR'};

const person = {
  name: 'John',
  age: 30,
  hobbies: ['coding', 'programming'],
  role: Role.ADMIN,
};


console.log(person.name);

if (person.role === Role.ADMIN) {
  console.log('Admin');
}
