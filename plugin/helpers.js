if (!this.myPlugin) {
    this.myPlugin = {};
}
/**
 * 继承
 */
this.myPlugin.inherit = (function () {
    var Temp = function () { }
    return function (son, father) {
        Temp.prototype = father.prototype;
        son.prototype = new Temp();
        son.prototype.constructor = son;
        son.prototype.uber = father.prototype;
    }
}());
/**
 * ES5的方法实现继承
 */
// this.myPlugin.inherit = function (son, father) {
//         son.prototype = Object.create(father.prototype);
//         son.prototype.constructor = son;
//         son.prototype.uber = father.prototype;
// }
/**
 * obj2混合到obj1产生新的对象
 */
this.myPlugin.mixin = function (obj1, obj2) {
    return Object.assign({}, obj1, obj2);
    // var newObj = {};
    // //复制obj2的属性
    // for (var prop in obj2) {
    //     newObj[prop] = obj2[prop];
    // }
    // //找到obj1中有但是obj2中没有的属性
    // for (var prop in obj1) {
    //     if (!(prop in obj2)) {
    //         newObj[prop] = obj1[prop];
    //     }
    // }
    // return newObj;
}

/**
 * 克隆一个对象
 * @param {boolean} deep 是否深度克隆
 */
this.myPlugin.clone = function (obj, deep) {
    if (Array.isArray(obj)) {
        if (deep) {
            //深度克隆
            var newArr = [];
            for (var i = 0; i < obj.length; i++) {
                newArr.push(this.clone(obj[i], deep));
            }
            return newArr;
        }
        else {
            return obj.slice(); //复制数组
        }
    }
    else if (typeof obj === "object") {
        var newObj = {};
        for (var prop in obj) {
            if (deep) {
                //深度克隆
                newObj[prop] = this.clone(obj[prop], deep);
            }
            else {
                newObj[prop] = obj[prop];
            }
        }
        return newObj;
    }
    else {
        //函数、原始类型
        return obj; //递归的终止条件
    }
}


/**
 * 函数防抖 只执行最后的一次函数,一顿时间后执行
 */
this.myPlugin.debounce = function (callback, time) {
    var timer;
    return function () { //返回函数 防止timer污染全局变量
        clearTimeout(timer);//清除之前的计时
        var args = arguments; //利用闭包保存参数数组
        timer = setTimeout(function () {
            callback.apply(null, args);
            // 再外部调用时可以用bind绑定this（提升:内层绑定this）
        }, time);
    }
}
/**
 * 函数节流 第一种：一段时间内只处理第一次，这段时间内如果之前的没处理完，后面直接不处理（每一次触发要过一段触发）
 */
this.myPlugin.debounce = function (callback, time) {
    var timer;
    return function () { //返回函数 防止timer污染全局变量
        if (timer) {
            return
        }
        var args = arguments; //利用闭包保存参数数组
        timer = setTimeout(function () {
            callback.apply(null, args);
            timer = null
            // 再外部调用时可以用bind绑定this（提升:内层绑定this）
        }, time);
    }
}
/**
 * 函数节流 第二种：第一次马上触发，下一次触发要过一段触发
 */
this.myPlugin.throttle = function (callback, time, immediately) {
    if (immediately === undefined) {
        immediately = true;
    }
    // immediately = immediately || true
    if (immediately) {
        var t;
        return function () {
            // if (immediately) {
            if (!t || Date.now() - t >= time) { //之前没有计时 或 距离上次执行的时间已超过规定的值
                callback.apply(null, arguments);
                t = Date.now(); //得到的当前时间戳
            }
            // }
        }
    }
    else {
        var timer;
        return function () {
            if (timer) {
                return;
            }
            var args = arguments; //利用闭包保存参数数组
            timer = setTimeout(function () {
                callback.apply(null, args);
                timer = null;
            }, time);
        }
    }
}

/**
 * 科里化函数
 * 在函数式编程中，科里化最重要的作用是把多参函数变为单参函数
 */
this.myPlugin.curry = function (func) {
    //得到从下标1开始的参数
    var args = Array.prototype.slice.call(arguments, 1);
    var that = this;
    return function () {
        var curArgs = Array.from(arguments); //当前调用的参数
        var totalArgs = args.concat(curArgs);
        if (totalArgs.length >= func.length) {
            //参数数量够了
            return func.apply(null, totalArgs);
        }
        else {
            //参数数量仍然不够
            totalArgs.unshift(func);
            return that.curry.apply(that, totalArgs);
        }
    }
}
/**
 * 函数管道
 */
this.myPlugin.pipe = function () {
    var args = Array.from(arguments);
    return function (val) {
        return args.reduce(function (result, func) {
            return func(result);
        }, val);
        // for (var i = 0; i < args.length; i++) {
        //     var func = args[i];
        //     val = func(val);
        // }
        // return val;
    }
}   