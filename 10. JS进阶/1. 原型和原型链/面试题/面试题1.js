var F = function () { }
Object.prototype.a = function () { }
Function.prototype.b = function () { }

var f = new F();

console.log(f.a, f.b, F.a, F.b);
// fn    undefined    fn    fn

f.__proto__ = F.prototype

F.prototype.__proto__ = Object.prototype

Object.prototype.__proto__ = null


F.prototype.__proto__ = Object.prototype

F.__proto__ = Function.prototype