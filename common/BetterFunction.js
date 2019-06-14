//单对象模式，也叫做命名空间模式
var MyFunctions = {
    isOdd: function (n) {
        return n % 2 !== 0;
    },
    /**
    * 判断某年是不是闰年
    * @param {*} year 
    */
    isLeap: function (year) {
        // 4年一闰，百年不闰；400年一闰
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },
    /**
     * 得到某年某月的天数
     * @param {*} year 
     * @param {*} month 
     */
    getDays: function (year, month) {
        if (month === 2) {
            return this.isLeap(year) ? 29 : 28;
        }
        else if (month < 8 && this.isOdd(month) || month >= 8 && !this.isOdd(month)) {
            return 31;
        }
        else {
            return 30;
        }
    }

}

