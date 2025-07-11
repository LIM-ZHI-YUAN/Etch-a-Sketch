const DEFAULTGRIDSIZE = 16;

const container = document.querySelector(".container");
const buttonGenerateGrid = document.querySelector(".btnGenerate");
const buttonResetGrid = document.querySelector(".btnReset");
const buttonToggle = document.querySelector(".btnToggle");
const buttonResetColor = document.querySelector(".btnResetColor");

let isEnabled = false;

buttonGenerateGrid.addEventListener("click", gridSizeScanner);
buttonResetGrid.addEventListener("click", resetGridSizeToDefault);
buttonToggle.addEventListener("click", toggleSketch);
buttonResetColor.addEventListener("click", resetCellColor);

createGrid(DEFAULTGRIDSIZE);

function gridSizeScanner() {
    const input = prompt(
        "Please enter the number of squares per side for the new grid"
    );
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
        const row = document.createElement("div");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.addEventListener("mouseover", changeCellColor);
            // cell.addEventListener('mouseout', resetCellColor);
            row.appendChild(cell);
        }
        row.setAttribute("class", "row");
        container.appendChild(row);
    }
}

function changeCellColor(e) {

    if (isEnabled == false) {
        return;
    }

    // https://stackoverflow.com/questions/76801065/how-can-i-implement-a-progressive-darkening-effect
    let currentBrightness = e.target.dataset.brightness || 100;
    currentBrightness = parseInt(currentBrightness) - 10;

    if (currentBrightness >= 0) {
        // Generate random RGB values
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Apply brightness reduction
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        e.target.style.filter = `brightness(${currentBrightness}%)`;
        e.target.dataset.brightness = currentBrightness;
    }
}

function resetCellColor(e) {
    const cellList = document.querySelectorAll('.cell');

    cellList.forEach(cell => {
        cell.style.backgroundColor = "lightgray";
        cell.style.filter = "brightness(100%)";
        delete cell.dataset.brightness;
    });
}

function toggleSketch(e) {
    isEnabled = !isEnabled;
    if (isEnabled) {
        e.target.style.backgroundColor = "green"
        e.target.textContent = "Enabled"
    } else {
        e.target.style.backgroundColor = "red"
        e.target.textContent = "Disabled"
    } 
}
