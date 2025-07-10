const DEFAULTGRIDSIZE = 16;

const container = document.querySelector('.container');
const buttonGenerateGrid = document.querySelector('.btnGenerate');
const buttonResetGrid = document.querySelector('.btnReset');

buttonGenerateGrid.addEventListener('click', gridSizeScanner);
buttonResetGrid.addEventListener('click', resetGridSizeToDefault);

createGrid(DEFAULTGRIDSIZE);

function gridSizeScanner() {
    const input = prompt("Please enter the number of squares per side for the new grid");
    const size = parseInt(input);

    if (input == null) {
        return;
    } else if (isNaN(size) || size <= 0 || size > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    createGrid(size);
}

function resetGridSizeToDefault() {
    createGrid(DEFAULTGRIDSIZE);
}

function createGrid(size) {

    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.addEventListener('mouseover', changeCellColor);
            cell.addEventListener('mouseout', resetCellColor);
            row.appendChild(cell);
        }
        row.setAttribute('class', 'row');
        container.appendChild(row);
    }
}

function changeCellColor(e) {
    e.target.style.backgroundColor = 'gray';
}

function resetCellColor(e) {
    e.target.style.backgroundColor = 'lightgray';
}