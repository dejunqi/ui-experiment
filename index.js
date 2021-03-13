

(function(w) {



    const tiles = document.querySelectorAll('.tile');
    const container = document.querySelector(".container");
    const tileContainer = document.querySelector(".tileContainer");
    // tile.addEventListener('')
    const leftBtn = document.querySelector(".arrowLeft");
    const rightBtn = document.querySelector(".arrowRight");
    const singleTileWidth = tiles[0].offsetWidth + 25;
    const numOfTiles = tiles.length;

    console.log(singleTileWidth, numOfTiles)


    function getWidth(ele, extra) {
        return ele.offsetWidth + extra;
    }

    function onResize() {
        console.log('tileContainer width: ', document.querySelector('.tileContainer').offsetWidth);
        console.log('tile width: ', document.querySelector('.tile').offsetWidth + 25);
        if ()
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
