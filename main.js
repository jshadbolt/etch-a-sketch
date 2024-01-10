const DEFAULTSIZE = 16
const DEFAULTCOLOR = '#000000'
const canvas = document.querySelector('.canvas')
const toggleGridButton = document.getElementById('toggle-grid-button')
const clearCanvasButton = document.getElementById('clear-canvas-button')
const colorPickerButton = document.getElementById('color-picker-button')
const swatch = document.getElementById('swatch')
const slider = document.getElementById('slider')
const sliderOutput = document.getElementById('slider-output')
let currentcolor = DEFAULTCOLOR
let gridState = 0

function updateCurrentColor() {
    currentcolor = swatch.value
    console.log(currentcolor)
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
                square.style.backgroundColor = currentcolor
            }
        }) 
        square.addEventListener('mousedown', () => {
            square.style.backgroundColor = currentcolor
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
    updateCurrentColor()
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

createSquares(DEFAULTSIZE)

