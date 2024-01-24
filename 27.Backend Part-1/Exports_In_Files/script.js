/* let n = 5;
for (let i = 0; i < n; i++) {
  console.log("Hello", i);
}
 */
/* console.log(process.argv);
let args = process.argv;
for (let i = 2; i < args.length; i++) {
  console.log("hello and welcome", args[i]);
} */
/* const someValue = require("./Math");
console.log(someValue.mul(45, 7)); */
/* const fruits = require("./BackendDir");
console.log(fruits[0].season);
 */
import { sub, sum } from "./Math.js";
import { generate } from "random-words";
console.log(sum(3, 7));
console.log(generate());
