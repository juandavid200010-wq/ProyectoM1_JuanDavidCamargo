const hex = [1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
const btn = document.getElementById("btn");
const box = document.querySelectorAll(".box");
const hexColors = document.querySelectorAll(".hexColors");
const rgbColor = document.querySelectorAll(".rgbColor");

btn.addEventListener("click", function () {
    box.forEach(function (box, index) {
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hex[getRandomNumber()];
        }
        box.style.backgroundColor = hexColor;
        hexColors[index].textContent = hexColor;
        rgbColor[index].textContent = hexToRgb(hexColor);
    });
});

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}

// ✅ Función para convertir de hex a rgb 


function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
}

