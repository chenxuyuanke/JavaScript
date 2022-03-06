// 1. 写一个函数，该函数用于判断某个数是不是奇数

// 函数名参考：isOdd

function isOdd(num) {
    return num % 2 !== 0
}

// 2. 写一个函数，该函数用于判断某个数是不是素数

// 函数名参考：isPrime

function isPrime(num) {
    let times = 0;
    for (let i = 2; i < num; i++) {
        num % i === 0 && times++;
    }
    return times === 0
}

// 3. 写一个函数，该函数用于对数组求和

// 函数名参考：sumOfArray

function sumOfArray(arr) {
    let count = 0
    for (let index = 0; index < arr.length; index++) {
        count += arr[index];
    }
    return count;
}


// 4. 写一个函数，该函数用于得到数组中的最大值

// 函数名参考：maxOfArray

function maxOfArray(arr) {
    let max = arr[0];
    for (let index = 1; index < arr.length; index++) {
        max < arr[index] && (max = arr[index])
    }
    return max
}

// 5. 写一个函数，该函数用于得到数组中的最小值

// 函数名参考：minOfArray

function minOfArray(arr) {
    let min = arr[0];
    for (let index = 1; index < arr.length; index++) {
        min > arr[index] && (min = arr[index])
    }
    return min
}

// 6. 写一个函数，该函数用于判断数组是否是稀松数组

// 函数名参考：hasEmptyInArray

function hasEmptyInArray(arr) {
    let result = false
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] === undefined || arr[index] === null) {
            result = true;
            // break;
        }
        console.log(arr[index])
    }
    return result;
}

// 7. 写一个函数，判断该某年是否是闰年

// 函数名参考：isLeap

function isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

// 8. 写一个函数，得到某年某月的天数

// 函数名参考：getDays

// function getDays(year, month) {
//     const date = new Date(year, month, 0)
//     return date.getDate()
// }

function getDays(year, month) {
    if (month === 2) {
        return isLeap(year) ? '29' : '28';
    } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return '31'
    } else {
        return '30'
    }
}

// 9. 写一个函数，得到某个数字数组中出现次数最多的数字和频率

// 函数名参考：getTopFreqInArray

function getTopFreqInArray(arr) {

    let obj = {};

    for (var i = 0; i < arr.length; i++) {
        if (obj[arr[i]] === undefined) {
            obj[arr[i]] = 1
        } else {
            obj[arr[i]]++
        }
    }
    let result = {}
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            if (element > result.times || !result.times) {
                result = {
                    number: key,
                    times: element
                }
            }
        }
    }
    return result
}

// 2. 写一个函数，为数组排序

// 要考虑到这个数组的所有可能,但是每一项类型相同

// sort

function sort(arr, compare) {
    for (let index = 1; index < arr.length; index++) {

        const times = arr.length - index;

        for (var i = 0; i < times; i++) {
            if (compare(arr[i], arr[i + 1]) > 0) {
                let item = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = item
            }
        }

    }

    return arr;
}

// var newArr = sort([23, 6, 666, 1, 55, 324], function (a, b) {
//     return a - b
// })
// console.log(newArr)
// 3. 写一个函数，按照指定的条件对某个数组进行筛选

// filter

function filter(arr, compare) {
    const newArr = []
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (compare(element)) {
            newArr.push(element)
        }
    }
    return newArr
}

// var newArr = filter([23, 6, 666, 1, 55, 324], function (a) {
//     return a < 30
// })
// console.log(newArr)
// 4. 写一个函数，按照指定的条件，得到某个数组中第一个满足条件的元素

// find

function find(arr, compare) {
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (compare(element)) {
            return element
        }
    }
}

// let item = find([23, 6, 666, 1, 55, 324], function (a) {
//     return a % 2 !== 0
// })


// 5. 写一个函数，按照指定的条件，得到某个数组中满足条件的元素数量

// count

function count(arr, compare) {
    let times = 0;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (compare(element)) {
            times++
        }
    }
    return times
}

let times = count([23, 6, 666, 1, 55], function (a) {
    return a % 2 === 0
})