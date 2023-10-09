const student = {
  name: "Mihir ",
  age: 20,
  add: "Mumbai",
  prop: this,
  marks: 40,
  getName: function () {
    console.log(this); //global scope
    return this.name;
  },
  getMarks: () => {
    return this.marks; //parent's scope
  },
};
console.log(student.getMarks());
