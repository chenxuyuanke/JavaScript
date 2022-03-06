var oInp = document.getElementsByTagName('input')[0]
var container = document.getElementById('container')
var clientHeight = document.documentElement.clientHeight
var clientWidth = document.documentElement.clientWidth;
oInp.onkeypress = function (e) {
    if (e.key === "Enter") {
        if (this.value) {
            createWish(this.value);
            this.value = "";
        }
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
function createWish(value) {
    var oDiv = document.createElement('div')
    oDiv.className = 'paper'
    oDiv.innerHTML = `<p>${value}</p><span>X</span>`;
    oDiv.style.backgroundColor = `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)})`
    oDiv.style.top = getRandom(0, clientHeight - 170) + 'px'
    oDiv.style.left = getRandom(0, clientWidth - 170) + 'px'
    getControlDom(oDiv)
    container.appendChild(oDiv)
}
function initApp() {
    var arr = ['天天开心', '暴富']
    arr.forEach(item => {
        createWish(item)
    })
    var controlDom = document.getElementsByClassName('paper')
    var controlDomArr = Array.from(controlDom)
    controlDomArr.forEach(element => {
        getControlDom(element)
    });
}
initApp()

function getControlDom(element) {
    element.onmousedown = function (e) {
        document.onmousemove = function (e) {
            const style = getComputedStyle(element)
            // console.log(e.offsetX)
            // movementX、movementY
            element.style.top = parseInt(style.top) + e.movementY + 'px'
            element.style.left = parseInt(style.left) + e.movementX + 'px'

        }
        element.onmouseup = function (e) {
            document.onmousemove = null
        }
    }
    element.lastElementChild.onclick = function (e) {
        this.parentElement.remove()
    }
}
// getControlDom()
