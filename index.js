

(function(w) {



    const tiles = document.querySelectorAll('.tile');
    const container = document.querySelector(".container");
    const tileContainer = document.querySelector(".tileContainer");
    // tile.addEventListener('')
    const leftBtn = document.querySelector(".arrowLeft");
    const rightBtn = document.querySelector(".arrowRight");
    const singleTileWidth = tiles[0].offsetWidth + 25;
    const numOfTiles = tiles.length;
    let numOfOverFlow = 0;

    function getWidth(selector, extra = 0) {
        return document.querySelector(selector).offsetWidth + extra;
    }

    function onResize() {

        const tileContainerWidth = getWidth('.tileContainer');
        const tileWidth = getWidth('.tile', 25);
        const overFlow = tileContainerWidth / tileWidth;
        // console.log(overFlow)

        if (overFlow <= 4.5) {
            numOfOverFlow = numOfTiles - Math.floor(overFlow);
            console.log('num of overflow: ', numOfOverFlow);
            for (let i = 4; i < tiles.length; i++) {
                tiles[i].style.visibility = "hidden"
            }
        } else {
            for (let i = 4; i < tiles.length; i++) {
                tiles[i].style.visibility = "unset"
            }
        }
    }

    const observer = new ResizeObserver(onResize)
        .observe(tileContainer);





    container.addEventListener('mouseover', (evnt) => {
        // console.log(evnt)
        // console.log("viewport width ", w.innerWidth);
        if (w.innerWidth >= 950) {
            return;
        }


        if (tileContainer.offsetLeft < 0) {
            // leftBtn.style.visibility = "unset";
            // rightBtn.style.visibility = "hidden";
        }

        // console.log('width: ', tileContainer.offsetWidth);

        if (tileContainer.offsetLeft === 0 && tileContainer.offsetWidth < 940) {
            // rightBtn.style.visibility = "unset";
        }
    });

    container.addEventListener('mouseout', () => {
        // rightBtn.style.visibility = "hidden";
        // leftBtn.style.visibility = "hidden";
    })

    leftBtn.addEventListener('click', () => {
        // tileContainer.style.offsetLeft = "-100px";
        var dis = getWidth(tiles[0], 25);
        tileContainer.style.left = `0px`;
        // tiles.forEach(e => e.style.display = "unset");
        rightBtn.style.visibility = "unset";
        leftBtn.style.visibility = "hidden";
    });

    rightBtn.addEventListener('click', () => {
        var dis = getWidth(tiles[0], 25);
        tileContainer.style.left = `-${dis}px`;
        tileContainer.style.right = "auto";
        // tileContainer.style.right = "100px";
        // tiles.forEach(e => e.style.display = "unset");
        // tiles.forEach(e => e.removeAttribute('style'))
        rightBtn.style.visibility = "hidden";
        leftBtn.style.visibility = "unset";
    });



})(window)
