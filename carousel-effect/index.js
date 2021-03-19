


const run = () => {

    const tiles = document.querySelectorAll(`.tile`);
    const carouselViewPort = document.querySelector(`.carouselViewPort`);
    const tileContainer = document.querySelector(`.tileContainer`);
    const leftBtn = document.querySelector(`.btnLeft`);
    const rightBtn = document.querySelector(`.btnRight`);


    if (!tiles || tiles.length <= 4 || !tileContainer || !carouselViewPort) {
        return;
    }
    const numOfTiles = tiles.length;
    const tileMargin = 24;
    const baseTileWidth = 177;

    let axesLen = numOfTiles * (baseTileWidth + tileMargin);

    let leftDiff = 0;

    const getWidth = (element, extraVal = 0) => {
        return element.offsetWidth + extraVal;
    };

    const elementEdgeInfo = (element) => {
        const { left, right } = element.getBoundingClientRect();
        return { left, right };
    };

    const updateStyle = (element, attr, value) => {
        let isNewStyle = true;
        let currentstyles = element.getAttribute('style')?.split(";") || [];
        for (let i = 0; i < currentstyles.length; i++) {
            if (currentstyles[i].includes(attr)) {
                currentstyles[i] = `${attr}: ${value}`;
                isNewStyle = false;
                break;
            }
        }
        if (isNewStyle) {
            currentstyles.push(`${attr}: ${value}`);
        }
        const newstyle = currentstyles.join(";");
        console.log(newstyle)
        element.setAttribute('style', newstyle);
    }

    const computePosIdx = () => {
        const carouselViewPortEdge = elementEdgeInfo(carouselViewPort);
        const tileContainerEdge = elementEdgeInfo(tileContainer);
        let l = -1, r = numOfTiles;
        const diffRight = carouselViewPortEdge.right - axesLen;
        const diffLeft = carouselViewPortEdge.left - tileContainerEdge.left;

        if (diffRight < 0) {
            const dr = Math.abs(diffRight)
            const divide = Math.floor( dr / baseTileWidth);
            const mod = dr % baseTileWidth;
            r -= divide;
            if (mod > 30) {
                r -= 1;
            }
        }

        if (diffLeft > 0) {
            const divide = Math.floor(diffLeft / getWidth(tiles[0], tileMargin));
            l = divide
        }

        return { leftIdx: l, rightIdx: r};
    };

    const updateBtnDisplay = () => {

    };

    const resizeCarousel = () => {
        console.log('resize')
        const { leftIdx, rightIdx } = computePosIdx();
        if (leftIdx > 0) return;
        const num = rightIdx;
        const viewPortWidth = getWidth(carouselViewPort);
        const w = (viewPortWidth / num)
        const len = numOfTiles * w - (tileMargin / 2);
        updateStyle(tileContainer, 'width', `${len}px`);
    }

    leftBtn.addEventListener('click', () => {
        console.log('left btn clicked')
        const { leftIdx } = computePosIdx();
        console.log(leftIdx);
        updateStyle(tileContainer, 'transform', "translateX(0)");
    });

    rightBtn.addEventListener('click', () => {
        const { leftIdx, rightIdx } = computePosIdx()
        if (rightIdx === numOfTiles) return;
        const overflowRight = numOfTiles - rightIdx;
        const overflowLeft = leftIdx  + 1;
        const singleTileWidth = getWidth(tiles[0], tileMargin);
        const dist = (overflowRight + overflowLeft) * singleTileWidth;
        updateStyle(tileContainer, 'transform', `translateX(-${dist}px)`);
    });

    const update = () => {
        resizeCarousel();
    }

    update();
    window.addEventListener('resize', () => {
        update();
    })

}





run();
