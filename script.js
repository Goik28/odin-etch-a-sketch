const canvas = document.querySelector('.canvas');
let canvasSize = 0;
let divList = [];
document.getElementById('color').value = '#ff0000';
let chosenColor = '#ff0000';
let randomMode = false;

document.getElementById('small').addEventListener('click', () => {
    canvasSize = 16;
    removeDivs();
    createDivs(canvasSize);
    addEvents();
    appendDivs();
    styleCanvas(canvasSize);
    resetCanvas();
    document.getElementById('small').disabled = true;
    document.getElementById('medium').disabled = false;
    document.getElementById('large').disabled = false;
})

document.getElementById('medium').addEventListener('click', () => {
    canvasSize = 32;
    removeDivs();
    createDivs(canvasSize);
    addEvents();
    appendDivs();
    styleCanvas(canvasSize);
    resetCanvas();
    document.getElementById('small').disabled = false;
    document.getElementById('medium').disabled = true;
    document.getElementById('large').disabled = false;
})

document.getElementById('large').addEventListener('click', () => {
    canvasSize = 64;
    removeDivs();
    createDivs(canvasSize);
    addEvents();
    appendDivs();
    styleCanvas(canvasSize);
    resetCanvas();
    document.getElementById('small').disabled = false;
    document.getElementById('medium').disabled = false;
    document.getElementById('large').disabled = true;

})

document.getElementById('colorEmpty').addEventListener('click', () => {
    resetCanvas();
})

document.getElementById('color').addEventListener('input', (e) => {
    chosenColor = e.target.value;
    randomMode = false;
    document.getElementById('colorRandom').disabled = false;
})

document.getElementById('colorRandom').addEventListener('click', () => {
    randomMode = true;
    document.getElementById('colorRandom').disabled = true;
})

function randomizeColor() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function addEvents() {
    divList.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            if (e.buttons > 0) {
                if (!randomMode) {
                    element.style.backgroundColor = '' + chosenColor;
                } else {
                    const color = randomizeColor()
                    element.style.backgroundColor = color;
                }
            }
        });
        element.addEventListener('click', (e) => {
            if (!randomMode) {
                element.style.backgroundColor = '' + chosenColor;
            } else {
                const color = randomizeColor()
                element.style.backgroundColor = color;
            }
        });
    });
}

function createDivs(size) {
    divList.length = 0;
    for (index = 0; index < (size * size); index++) {
        divList.push(document.createElement('div'));
    }
}

function appendDivs() {
    divList.forEach(element => {
        canvas.appendChild(element);
    });
}

function removeDivs() {
    canvas.innerHTML = '';
}

function styleCanvas(size) {
    const grid = document.createElement('style');
    grid.appendChild(document.createTextNode(
        `.canvas{
            grid-template-columns: repeat(${size},auto);
            grid-template-rows: repeat(${size},auto);
        }`
    ));
    canvas.appendChild(grid);
}

function resetCanvas() {
    divList.forEach(element => {
        element.style.backgroundColor = 'white';
    });
}