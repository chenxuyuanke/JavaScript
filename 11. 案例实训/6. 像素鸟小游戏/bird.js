/**
 * 得到一个计时器对象，该对象提供了两个方法：
 * 1. start，启动计时器
 * 2. stop，停止计时器
 * @param {*} callback 每隔一段时间运行的函数
 * @param {*} thisArg this指向的对象
 */
function getTimer(duration, thisArg, callback) {
    var timer;
    return {
        start: function () {
            if (timer) {
                return;
            }
            timer = setInterval(callback.bind(thisArg), duration)
        },
        stop: function () {
            clearInterval(timer);
            timer = null;
        }
    }
}

/**
 * 游戏对象
 */
var game = {
    dom: document.querySelector(".game"), //游戏dom元素
    isPause: true, //是否处于暂停状态
    start: function () {
        sky.timer.start(); //天空开始移动
        land.timer.start(); //大地开始移动
        bird.swingTimer.start();//小鸟煽动翅膀
        bird.dropTimer.start();
        this.isPause = false;
    },
    stop: function () {
        sky.timer.stop();
        land.timer.stop();
        bird.swingTimer.stop();
        bird.dropTimer.stop();
        this.isPause = true;
    }
}
game.width = game.dom.clientWidth; //面板宽度
game.height = game.dom.clientHeight;

//天空对象
var sky = {
    left: 0, //当前的横坐标
    dom: document.querySelector(".game .sky")
};

sky.timer = getTimer(16, sky, function () {
    this.left--;
    if (this.left === -game.width) {
        this.left = 0;
    }
    this.dom.style.left = this.left + "px";
})

//大地对象
var land = {
    left: 0, //当前的横坐标
    dom: document.querySelector(".game .land")
};

land.height = land.dom.clientHeight;//大地的高度
land.top = game.height - land.height;//大地的纵坐标

land.timer = getTimer(16, land, function () {
    this.left -= 2;
    if (this.left === -game.width) {
        this.left = 0;
    }
    this.dom.style.left = this.left + "px";
})

//小鸟
var bird = {
    dom: document.querySelector(".game .bird"),
    left: 150,
    top: 150,
    width: 33,
    height: 26,
    swingIndex: 0, //翅膀的状态：0~2
    a: 0.002, //重力加速度
    v: 0, //当前速度
    t: 16, //时间间隔
    show() {    //显示小鸟
        //处理翅膀
        if (this.swingIndex === 0) {
            this.dom.style.backgroundPosition = "-8px -10px";
        }
        else if (this.swingIndex === 1) {
            this.dom.style.backgroundPosition = "-60px -10px";
        }
        else {
            this.dom.style.backgroundPosition = "-113px -10px";
        }
        //设置小鸟的位置
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    },
    setTop(top) { //设置小鸟的top值
        if (top < 0) {
            top = 0;
        }
        else if (top > land.top - this.height) {
            top = land.top - this.height;
        }
        this.top = top;
        this.show();
    },
    jump() {
        this.v = -0.5;
    }
}

bird.show();
//翅膀计时器
bird.swingTimer = getTimer(200, bird, function () {
    this.swingIndex = (this.swingIndex + 1) % 3;
    this.show();
})
//下坠计时器
bird.dropTimer = getTimer(bird.t, bird, function () {
    //计算移动距离
    var dis = this.v * this.t + 0.5 * this.a * this.t * this.t;
    //改变速度
    this.v = this.v + this.a * this.t;
    //改变top
    this.setTop(this.top + dis);
})

//注册事件
window.onkeydown = function (e) {
    if (e.key === "Enter") {
        //开始/暂停
        if (game.isPause) {
            game.start();
        }
        else {
            game.stop();
        }
    }
    else if (e.key === " ") {
        console.log("asdfasf");
        bird.jump();
    }
}