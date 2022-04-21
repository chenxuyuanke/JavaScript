var container = document.querySelector('.container')

container.onclick = function (e) {

    if (e.target.nodeName === 'H2') {
        var activeItem = this.querySelector('.menu .items.active')
        // console.log(e.target.nextElementSibling);
        var targetItem = e.target.nextElementSibling

        if(targetItem === activeItem){
            activeItem && hideItem(activeItem)
        }else{
            showItem(targetItem)
            activeItem && hideItem(activeItem)
        }

        // targetItem.classList.add('active');
        
        // activeItem && activeItem.classList.remove('active')
    }
}

function showItem(target) {

    var targetHeight = target.children.length * 30;

    var animate = new myPlugin.Animate({
        total:500,
        begin: {
            height: 0
        },
        end: {
            height:targetHeight
        },
        onmove() {

            // debugger
            target.style.height = this.curData.height + 'px'
        },
        onstart() {
            target.style.height='0px'
            target.classList.add('active');
            
        }
    })
    animate.start()
}

function hideItem(target) {
    var height = target.clientHeight;

    var animate = new myPlugin.Animate({
        total:500,
        begin: {
            height
        },
        end: {
            height: 0
        },
        onmove() {
            target.style.height = this.curData.height + 'px'
        },
        onover() {
            target.classList.remove('active');
        }
    })
    animate.start()
}