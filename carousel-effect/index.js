


const run = () => {

    const tiles = document.querySelectorAll(`.tile`);
    const carouselViewPort = document.querySelector(`.carouselViewPort`);
    const tileContainer = document.querySelector(`.tileContainer`);
    const leftBtn = document.querySelector(`.btnLeft`);
    const rightBtn = document.querySelector(`.btnRight`);
    const sbcCardContainer = document.querySelector(`.sbcCardContainer`);


    if (!tiles || tiles.length <= 4 || !tileContainer || !carouselViewPort) {
        return;
    }

    const getWidth = (element, extraVal = 0) => {
        return element.offsetWidth + extraVal;
    };

    const TILE_NUMBER = tiles.length;
    const TILE_MARGIN = 24;
    const BASE_TILE_WIDTH = 177;
    const DIFF_FOR_OVERFLOW = TILE_NUMBER > 5 ? 30 : 10;
    const ANIMATION_DELAY = 200;

    let axesLen = TILE_NUMBER * (BASE_TILE_WIDTH + TILE_MARGIN);

    const elementEdgeInfo = (element) => {
        const { left, right } = element.getBoundingClientRect();
        return { left, right };
    };

    const updateStyle = (element, attr, value) => {
        let isNewStyle = true;
        let currentstyles = element.getAttribute('style')?.split(';') || [];
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
        const newstyle = currentstyles.join(';');
        element.setAttribute('style', newstyle);
    };



    const computePosIdx = () => {
        const carouselViewPortEdge = elementEdgeInfo(carouselViewPort);
        const tileContainerEdge = elementEdgeInfo(tileContainer);
        let l = -1,
            r = TILE_NUMBER;
        const diffLeft = carouselViewPortEdge.left - tileContainerEdge.left;
        let diffRight = carouselViewPortEdge.right - axesLen;
        if (diffLeft > 0) {
            const divide = Math.floor(diffLeft / getWidth(tiles[0], TILE_MARGIN));
            l = divide - 1; // array starts from 0 index
            diffRight = carouselViewPortEdge.right - tileContainerEdge.right;
        }

        if (diffRight < 0) {
            const dr = Math.abs(diffRight);
            const divide = Math.floor(dr / BASE_TILE_WIDTH);
            const mod = dr % BASE_TILE_WIDTH;
            r -= divide;
            if (mod >= DIFF_FOR_OVERFLOW) {
                r -= 1;
            }
        }

        return { leftIdx: l, rightIdx: r };
    };

    const updateShiftProperty = ({ isLeftshifted, isRightshifted }) => {
        const { leftIdx, rightIdx } = computePosIdx();
        if (typeof isRightshifted === 'undefined') {
            isRightshifted = rightIdx < TILE_NUMBER;
        }
        if (typeof isLeftshifted === 'undefined') {
            isLeftshifted = leftIdx >= 0;
        }
        sbcCardContainer.setAttribute('left-shift', isLeftshifted);
        sbcCardContainer.setAttribute('right-shift', isRightshifted);
    }

    // const updateBtnDisplay = () => {
    //     // TODO: use debounce to handle btn update
    //     const { leftIdx, rightIdx } = computePosIdx();
    //     const overflowRight = TILE_NUMBER - rightIdx;
    //     const overflowLeft = leftIdx + 1;
    //     const leftVal = overflowLeft > 0 ? 'visible' : 'hidden';
    //     const rightVal = overflowRight > 0 ? 'visible' : 'hidden';
    //     // updateStyle(leftBtn, 'visibility', leftVal);
    //     // updateStyle(rightBtn, 'visibility', rightVal);
    //     const args = {
    //         isLeftshifted: overflowLeft > 0,
    //         isRightshifted: overflowRight > 0
    //     }
    //     updateShiftProperty(args)
    // };

    const resizeCarousel = () => {
        const { leftIdx, rightIdx } = computePosIdx();

        // Logic could be very complcated. For now, prevent resize after user has click right button once
        if (leftIdx >= 0) return;
        const num = rightIdx;
        const viewPortWidth = getWidth(carouselViewPort);
        const w = viewPortWidth / num;
        const len = TILE_NUMBER * w - TILE_MARGIN / 2;
        updateStyle(tileContainer, 'width', `${len}px`);
        for (let i = 0; i < TILE_NUMBER; i++) {
            updateStyle(tiles[i], 'width', `${w}px`);
        }
        const isLeftshifted = leftIdx >= 0;
        const isRightshifted = rightIdx < TILE_NUMBER;
        // updateShiftProperty({ isLeftshifted, isRightshifted });
    };

    leftBtn.addEventListener('click', () => {
        updateStyle(tileContainer, 'transform', 'translateX(0)');
        updateShiftProperty({isLeftshifted: false });
    });

    rightBtn.addEventListener('click', () => {
        const { leftIdx, rightIdx } = computePosIdx();
        if (rightIdx === TILE_NUMBER) return;
        const overflowRight = TILE_NUMBER - rightIdx;
        const overflowLeft = leftIdx + 1;
        const singleTileWidth = getWidth(tiles[0], TILE_MARGIN);
        const dist = (overflowRight + overflowLeft) * singleTileWidth;
        updateStyle(tileContainer, 'transform', `translateX(-${dist}px)`);
        updateShiftProperty({isLeftshifted: true, isRightshifted: false});
    });

    carouselViewPort.addEventListener('mouseover', () => {
        updateShiftProperty({});
    });

    carouselViewPort.addEventListener('mouseout', () => {
        updateShiftProperty({isLeftshifted: false, isRightshifted: false})
    })



    const update = () => {
        resizeCarousel();
        // updateBtnDisplay();
    };

    update();
    window.addEventListener('resize', () => {
        update();
    })

}

run();
