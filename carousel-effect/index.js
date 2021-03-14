


const run = () => {

    const tiles = document.querySelectorAll('.tile');
    const tileContainer = document.querySelector(".tileContainer");
    const leftBtn = document.querySelector(".arrowLeft");
    const rightBtn = document.querySelector(".arrowRight");
    const numOfTiles = tiles.length;
    let numOfOverFlow = 0;

    function getWidth(selector, extra = 0) {
        return document.querySelector(selector).offsetWidth + extra;
    }

    const tileWidth = getWidth('.tile', 25);

    function setVisibility(value) {
        for (let i = tiles.length - 1; i >= tiles.length - numOfOverFlow ; i--) {
            tiles[i].style.visibility = value;
        }
    }

    function onResize() {
        const tileContainerWidth = getWidth('.tileContainer');
        const overFlow = tileContainerWidth / tileWidth;
        if (overFlow <= 4.7) {
            numOfOverFlow = numOfTiles - Math.floor(overFlow);
            setVisibility('hidden');

        } else {
            setVisibility("unset");
            if (!!tileContainer.style.left && parseInt(tileContainer.style.left) < 0) {
                tileContainer.style.left = "0px";
            }
            numOfOverFlow = 0;
        }
    }

    const observe = (selector, attribute, callback) => {
        let prevW = getWidth('.tileContainer');

        let interval = setInterval(() => {
            const w = getWidth('.tileContainer');
            if (w != prevW) {
                console.log('resized');
                if (callback && {}.toString.call(callback) === '[object Function]') {
                    callback();
                }
                prevW = w;
            }
        }, 100);
        // return () => clearInterval(interval);
    }

    observe('.tileContainer', 'offsetWidth', onResize);




    // window.addEventListener('resize', onResize);
    // window.addEventListener('load', onResize);

    leftBtn.addEventListener('click', () => {
        tileContainer.style.left = `0px`;
        setVisibility("hidden");
    });

    rightBtn.addEventListener('click', () => {
        var dis = numOfOverFlow * tileWidth;
        tileContainer.style.left = `-${dis}px`;
        tileContainer.style.right = "auto";
        setVisibility("unset");
    });

    // return () => {
    //     window.removeEventListener('resize', onResize);
    //     window.removeEventListener('load', onResize);
    // }
}

run();


