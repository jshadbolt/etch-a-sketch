const DEFAULTSIZE = 16
const DEFAULTCOLOUR = '#000'
const canvas = document.querySelector('.canvas')
const toggleGridButton = document.getElementById('toggle-grid-button')
const clearCanvasButton = document.getElementById('clear-canvas-button')
const colorPickerButton = document.getElementById('color-picker-button')
let slider = document.getElementById('slider')
let sliderOutput = document.getElementById('slider-output')
createSquares(DEFAULTSIZE)

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
            square.classList.add('square-border')
            addDraw(square)
            column.appendChild(square)
        }
        canvas.appendChild(column)
    }
}

function addDraw(square) {
    square.addEventListener('mouseover', () => {
        if (mouseDown) {
        square.style.backgroundColor = 'black'
        }
    })
    square.addEventListener('mousedown', () => {
        square.style.backgroundColor = 'black'
    })
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
    let squares = document.querySelectorAll('.square')
    squares.forEach(square => {
        square.classList.toggle('square-border')
    })
})

clearCanvasButton.addEventListener('click', () => {
    newGrid();
})



