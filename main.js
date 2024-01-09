const DEFAULTSIZE = 16
const DEFAULTCOLOUR = '#000'
const canvas = document.querySelector('.canvas')
const sizeSlider = document.getElementById('sizeSlider')
const toggleGridButton = document.getElementById('toggle-grid-button')
const clearCanvasButton = document.getElementById('clear-canvas-button')
const colorPickerButton = document.getElementById('color-picker-button')
createGrid(DEFAULTSIZE)
let squares = document.querySelectorAll('.square')

function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let column = document.createElement('div')
        column.className = 'column'
        for (let j = 0; j < gridSize; j++) {
            let square = document.createElement('div')
            square.className = 'square'
            square.classList.add('square-border')
            square.addEventListener('mouseover', () => {
                // square.style.backgroundColor = 'black'
            })
            column.appendChild(square)
        }
        canvas.appendChild(column)
    }
}

function destroyGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function newGrid() {
    destroyGrid(canvas)
    createGrid(sizeSlider.value)
}

sizeSlider.addEventListener('mouseup', () => {
    destroyGrid(canvas)
    createGrid(sizeSlider.value)
    console.log(sizeSlider.value)
})

toggleGridButton.addEventListener('click', () => {
    squares.forEach(square => {
        square.classList.toggle('square-border')
    })
})

clearCanvasButton.addEventListener('click', () => {
    newGrid();
})




