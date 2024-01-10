const DEFAULTSIZE = 16
const DEFAULTcolor = '#000000'
const canvas = document.querySelector('.canvas')
const toggleGridButton = document.getElementById('toggle-grid-button')
const clearCanvasButton = document.getElementById('clear-canvas-button')
const colorPickerButton = document.getElementById('color-picker-button')
const swatch = document.getElementById('swatch')
const slider = document.getElementById('slider')
const sliderOutput = document.getElementById('slider-output')
let currentcolor = DEFAULTcolor

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
            square.classList.toggle('grid')
            column.appendChild(square)
        }
        canvas.appendChild(column)
    }
    addDraw()
}

function destroyGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function newGrid() {
    destroyGrid(canvas)
    createSquares(slider.value)
}

slider.addEventListener('mouseup', () => {
    destroyGrid(canvas)
    createSquares(slider.value)
    console.log(slider.value)
})

slider.addEventListener('input', () => {
    sliderOutput.innerHTML = slider.value
})

toggleGridButton.addEventListener('click', () => {
    toggleGrid()
})

clearCanvasButton.addEventListener('click', () => {
    newGrid();
})

function toggleGrid() {
    let squares = document.querySelectorAll('.square')
    squares.forEach(square => {
        square.classList.toggle('grid')
    })
}

function updateCurrentColor() {
    currentcolor = swatch.value
    console.log(currentcolor)
}

function addDraw() {
    let squares = Array.from(document.querySelectorAll('.square'))
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

swatch.addEventListener('input', () => {
    updateCurrentColor()
})


createSquares(DEFAULTSIZE)
