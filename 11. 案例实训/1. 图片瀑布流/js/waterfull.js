if (!myPlugin) {
    this.myPlugin = {
    }
}

this.myPlugin.createWaterFall = function (option) {
    const defaulOption = {
        minGap: 10,
        imgWidth: 220,
        container: document.body,
        imgSrcs: []
    }
    const imgs = [];

    option = Object.assign({}, defaulOption, option)

    fillImage()
    handleParent()
    // 计算行数
    function computeRow() {
        // option.container.clientWidth + minGap /imgWidth +  minGap = row * imgWidth + (row ) * minGap

        const row = Math.floor((option.container.clientWidth + option.minGap) / (option.imgWidth + option.minGap))
        const realGap = (option.container.clientWidth - option.imgWidth * row) / (row - 1)
        return {
            row,
            realGap,
            width: option.container.clientWidth
        }

    }
    // var debounce = myPlugin.debounce(computeImagePosition, 300)

    window.onresize = computeImagePosition;

    // 计算每张图片的位置
    function computeImagePosition() {
        // let i = index % obj.row
        const obj = computeRow()

        const imageTopArr = new Array(obj.row)

        imageTopArr.fill(0)

        for (let index = 0; index < imgs.length; index++) {

            const element = imgs[index];

            let minIndex = imageTopArr.indexOf(Math.min(...imageTopArr))

            element.style.left = minIndex * (obj.realGap + option.imgWidth) + 'px';

            let top = imageTopArr[minIndex]

            element.style.top = top + 'px'

            imageTopArr[minIndex] = parseInt(element.height) + top + obj.realGap

        }

        option.container.style.height = Math.max(...imageTopArr) - obj.realGap + 'px';

    }

    // 创建图片
    function fillImage() {

        for (let index = 0; index < option.imgSrcs.length; index++) {
            const src = option.imgSrcs[index]
            const imgEle = document.createElement('img');
            imgEle.src = src;
            imgEle.style.width = option.imgWidth + 'px'
            imgEle.style.position = 'absolute';
            imgEle.onload = computeImagePosition;
            imgs.push(imgEle)
            option.container.appendChild(imgEle)
        }
    }

    function handleParent() {
        //如果父元素不是定位元素，则将其变为相对定位
        var style = getComputedStyle(option.container);
        if (style.position === "static") {
            option.container.style.position = "relative";
        }
    }
}