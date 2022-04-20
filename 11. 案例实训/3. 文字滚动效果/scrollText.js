var ul = document.querySelector('.container .left ul')
var length = ul.children.length;
var distance = 30;

function cloneFirstLi() {

    var cloneLi = ul.children[0].cloneNode(true);

    ul.appendChild(cloneLi)
}

cloneFirstLi()

var timer = null
var curTop = 0;
var finalTop = length * 30;
var animate;

function onceMove() {
    animate = new myPlugin.Animate({
        total: 300,
        begin: {
            top: curTop
        },
        end: {
            top: curTop + distance
        },
        onmove: function () {
            ul.scrollTop = this.curData.top
        },
        onover: function () {
            curTop += distance
            if (curTop === finalTop) {
                curTop = 0
              
            }
        }
    })
    animate.start()
}

function moveUl() {
    timer = setInterval(onceMove, 1000)
}
moveUl()


ul.onmouseover = function () {
    animate.stop()
    clearInterval(timer)
    timer = null
}
ul.onmouseout = function () {
    animate.start()
    timer = setInterval(onceMove, 1000)
}