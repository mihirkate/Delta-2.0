class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    talk(){
        console.log(`My name is ${this.name}`);
    }
  }
}
class Student extends Person{
    constructor(name,age,marks){
        super(age,name);
 this.marks=marks;
    }

}
class Teacher  extends Person{
    constructor(name,age,marks){
       super(age,name);
        this.subject=subject;
    }

}
