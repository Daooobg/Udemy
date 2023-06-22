///////////////////////CLASSES/////////////////////

// class Department {
//   name: string;
//   private employees: string[] = [];

//   constructor(n: string) {
//     this.name = n;
//   }

//   describe(this: Department) {
//     console.log('Department: ' + this.name);
//   }

//   addEmployee(employee: string) {
//     this.employees.push(employee);
//   }

//   printEmployeeInformation() {
//     console.log(this.employees.length);
//     console.log(this.employees);
//   }
// }

// const accounting = new Department('Accounting');
// console.log(accounting);

// accounting.addEmployee('Max');
// accounting.addEmployee('Ivan');
// // accounting.employees[2] = 'George'

// accounting.describe();

// accounting.printEmployeeInformation();

// // const accountingCopy = { name: 'Ivan', describe: accounting.describe };

// // accountingCopy.describe();

////////////INHERITANCE/////////////////////////

abstract class Department {
  static fiscalYear = 2020; //static method
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // console.log(this.fiscalYear)  //Can't access static methods whit (this)
    console.log(Department.fiscalYear);
  }

  //   static method
  static createEmployee(name: string) {
    return { name: name };
  }

  //   abstract classes
  abstract describe(this: Department): void;
  //   describe(this: Department) {
  //     console.log(`Department (${this.id}): + ${this.name}`);
  //   }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartments extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartments('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Ivan');
// accounting.employees[2] = 'George'

it.describe();

it.printEmployeeInformation();
console.log(it);

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  //   Getter and Setter
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  //   Singletons private constructor
  private constructor(id: string, private reports: string[]) {
    super(id, 'IT');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting === accounting2); // both received the same instance

// console.log(accounting.mostRecentReport);

accounting.mostRecentReport = 'New report';

accounting.addReport('Something went wrong');

console.log(accounting.mostRecentReport);

accounting.addEmployee('Max');
accounting.addEmployee('Victor');

accounting.describe();

accounting.printEmployeeInformation();

accounting.printReports();

// accountingCopy.describe();
