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
