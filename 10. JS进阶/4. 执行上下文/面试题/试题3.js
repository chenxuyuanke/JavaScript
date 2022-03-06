console.log(foo); //foo
var foo = "A";
console.log(foo)  //'A'
var foo = function () {
    console.log("B");
}
console.log(foo);  //fn
foo(); //'B'
function foo(){
    console.log("C");
}
console.log(foo)  //fn
foo(); // 'B'