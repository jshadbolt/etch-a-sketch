const DEFAULTSIZE = 16
const DEFAULTCOLOR = '#748BFB'
const canvas = document.querySelector('.canvas')
const toggleGridButton = document.getElementById('toggle-grid-button')
const clearCanvasButton = document.getElementById('clear-canvas-button')
const colorPickerButton = document.getElementById('color-picker-button')
const swatch = document.getElementById('swatch')
let pseudoSwatch = document.querySelector('-webkit-color-swatch')
const slider = document.getElementById('slider')
const sliderOutput = document.getElementById('slider-output')
const rainbowButton = document.getElementById('rainbow-button')
const controlButtons = document.querySelectorAll('.toggleAble')
let currentColor = DEFAULTCOLOR
let gridState = 0
let state = 0
let intervalId;

function updatecurrentColor(source) {
    currentColor = source
    console.log(currentColor)
}

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

function createSquares(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let column = document.createElement('div')
        column.className = 'column'
        for (let j = 0; j < gridSize; j++) {
            let square = document.createElement('div')
            square.className = 'square'
            column.appendChild(square)
        }
        canvas.appendChild(column)
    }
    addDraw();
    if (gridState === 1) {
        squares.forEach(square => {
            square.classList.toggle('grid')
        })
    }
}

function addDraw() {
    squares = Array.from(document.querySelectorAll('.square'))
    squares.forEach((square) => {
        square.addEventListener('mouseover', () => {
            if (mouseDown) {
                square.style.backgroundColor = currentColor
            }
        }) 
        square.addEventListener('mousedown', () => {
            square.style.backgroundColor = currentColor
        })    
    })
}

function destroySquares() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function newGrid() {
    destroySquares()
    createSquares(slider.value)
}

function toggleGrid() {
    squares.forEach(square => {
        square.classList.toggle('grid')
    })
    gridState === 0 ? gridState = 1 : gridState = 0
    console.log(gridState)
}

swatch.addEventListener('input', () => {
    updatecurrentColor(swatch.value)
})

slider.addEventListener('mouseup', () => {
    console.log(slider.value)
    newGrid();
})

slider.addEventListener('input', () => {
    sliderOutput.innerHTML = slider.value
})

clearCanvasButton.addEventListener('click', () => {
    newGrid();
})

toggleGridButton.addEventListener('click', () => {
    toggleGrid()
})

rainbowButton.addEventListener('click', () => {
    rainbowMode(rainbowButton, 500)
  });

Array.from(controlButtons).forEach(function(button) {
button.addEventListener('click', () => {
    button.classList.toggle('darken')
})
});

function updateButtonState() {
    state === 0 ? state = 1 : state = 0 ;
}

function rainbowMode(target, intervalTime) {
    updateButtonState()
    changeColor(target)
    if (state === 1) {
        intervalId = setInterval(() => {
            changeColor(target)
        }, intervalTime);
    }
    if (state === 0) {
        clearInterval(intervalId);
    }
}

function changeColor(target) {
    array = []
    for (let i = 0; i < 3; i++) {
        array.push(randomRgbValue(0, 255))
    }
    let rgbValue = `rgb(${array.join(`,`)})`
    currentColor = rgbValue
    swatch.value = rgbToHex(array)
}

function randomRgbValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function valueToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(array) {
    let hexCode = `#${(valueToHex(array[0]) + valueToHex(array[1]) + valueToHex(array[2]))}`;
    console.log(hexCode)
    return hexCode
    }



createSquares(DEFAULTSIZE)