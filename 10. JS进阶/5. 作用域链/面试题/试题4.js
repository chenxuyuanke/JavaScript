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
    // 这种写法是在全局创建10个匿名函数，scope都指向GO，只是被当成参数传入setTimeout
    // setTimeout这个函数是马上执行结束，然后销毁的，只是告诉浏览器的定时器线程，让它一秒钟后执行函数，函数的定义是立即完成的
    // 等for循环结束才过去1秒左右,而且setTimeout还是异步任务
}


for (var i = 0; i < 3; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 1000)
    }(i))

}


