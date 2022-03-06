var  myFunction={
    isOdd:function (number) {
        if (number % 2 === 0) {
            return false
        }
        return true
    },
    isPrime:function (number) {
        if (number < 2) {
            return false
        }
        for (let i = 2; i < number; i++) {
            if (number % i === 0) {
                return false
            }
        }
        return true
    },
    sumOfArray:function(arr) {
        let sum = 0;
        for (let index = 0; index < arr.length; index++) {
            sum += arr[index];
        }
        return sum;
    },
    maxOfArray:function (arr) {
        let max = arr[0];
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] > max) {
                max = arr[index]
            }
        }
        return max;
    },
    hasEmptyInArray:function(arr) {
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === undefined) {
                return true
            }
        }
        return false
    },
    isLeap:function(year) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return true
        }
        return false
    },
    getDays:function(year, month) {
        let yearIsLeap = this.isLeap(year)
        if (month === 2) {
            if (yearIsLeap) {
                return 29
            } else {
                return 28
            }
        } else if (month === 1 || month === 3|| month === 5|| month === 7|| month === 8|| month === 10|| month === 12){
            return 31
        } else {
            return 30
        }
        
    },
    getTopFreqInArray:function(arr) {
        var records = {}; //记录出现频率
        for (var i = 0; i < arr.length; i++) {
            var n = arr[i];
            if (records[n]) {
                records[n]++;
            }
            else {
                records[n] = 1;
            }
        }
        var result; //记录最终结果的对象
       for (const key in records) {
           if(records[key]>result.frequency){
               result={
                   number:+key,
                   frequency:records[prop]
               }
           }
       }
        return result;
    }
}

















