if (!this.myPlugin) {
    this.myPlugin = {};
}

this.myPlugin.Animate = function (option) {

    const defalutOption = {
        duration: 16, //默认间隔时间，单位毫秒
        total: 1000, //默认总时间
        begin: {}, //初始值
        end: {} //终止值
    }
    this.finalOption = myPlugin.mixin(defalutOption, option);

    this.curTimes = 0

    this.times = Math.ceil(this.finalOption.total / this.finalOption.duration)

    this.curData =  myPlugin.clone(this.finalOption.begin)

    this.everyData = {};

    for (const key in this.finalOption.begin) {
        this.everyData[key] = (this.finalOption.end[key] - this.finalOption.begin[key]) / this.times
    }

    this.timerId = null

}

this.myPlugin.Animate.prototype.start = function () {

    if(this.timerId || this.curTimes === this.times){
        return;
    }
 
    this.finalOption.onstart && this.finalOption.onstart.call(this)

    let that = this;

    this.timerId = setInterval(function () {

        that.curTimes++
        // console.log(that.curData,that.finalData,that.times,that.curTimes);

        for (const key in that.curData) {

            if (that.curTimes === that.times) {
                that.curData[key] = that.finalOption.end[key]
            } else {
                that.curData[key] += that.everyData[key]
            }
            
        }
        that.finalOption.onmove && that.finalOption.onmove.call(that)

        if (that.curTimes === that.times) {
            that.finalOption.onover && that.finalOption.onover.call(that)
            that.stop()
        }

    }, this.finalOption.duration)
}

this.myPlugin.Animate.prototype.stop = function () {
    // debugger
    
    clearInterval(this.timerId)
    this.timerId = null
}