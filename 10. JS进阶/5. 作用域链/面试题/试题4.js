// function A() {
//     for (var i = 0; i < 10; i++) {
//         setTimeout(function () {
//             console.log(i);
//         }, 1000)
//     }
// }

// A();

// console.log(i);


for (var i = 0; i < 3; i++) {
        setTimeout(function () {
            console.log(i);
        }, 1000)
        // 这种写法是匿名函数在全局创建，只是被当成参数传入setTimeout
        // setTimeout这个函数是马上执行结束，然后销毁的，只是告诉浏览器的定时器线程，让它一秒钟后执行函数

}


for (var i = 0; i < 3; i++) {
    (function (i){
        setTimeout(function () {
            console.log(i);
        }, 1000)
    }(i))

}


