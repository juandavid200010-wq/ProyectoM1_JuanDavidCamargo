
// Funcion para obtener un color aleatorio

const hex = [1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
const btn = document.getElementById("btn");
const box = document.querySelectorAll(".box");
const hexColors = document.querySelectorAll(".hexColors");
const hslColor = document.querySelectorAll(".hslColor");
const paletteSize = document.getElementById("paletteSize");

btn.addEventListener("click", function () {
    box.forEach(function (box, index) {
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hex[getRandomNumber()];
        }
        box.style.backgroundColor = hexColor;
        hexColors[index].textContent = hexColor;
        hslColor[index].textContent = hexToHsl(hexColor);
    });
});

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}



// ✅ Función para convertir de hex a hsl


function hexToHsl(hex) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) 
        {hex = hex.split('').map(char => char + char).join('');
    }

    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    // Luminosidad
    let l = (max + min) / 2;

    // Saturación
    let s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Tono (Hue)
    let h = 0;
    if (delta !== 0) {
        if (max === r) h = ((g - b) / delta) % 6;
        else if (max === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
    }

    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Tamaño de la paleta 6 8 o 9

btn.addEventListener("click", function () {
    const size = parseInt(paletteSize.value) || 9;

    box.forEach(function (box, index) {
        if (index < size) {
            box.style.display = "flex";

            let hexColor = "#";
            for (let i = 0; i < 6; i++) {
                hexColor += hex[getRandomNumber()];
            }
            box.style.backgroundColor = hexColor;
            hexColors[index].textContent = hexColor;
            hslColor[index].textContent = hexToHsl(hexColor);
        } else {
            box.style.display = "none";
        }
    });
});


// Cuando se oprime la opcion se cambia el tamaño de la paleta


paletteSize.addEventListener("change", function () {
    const size = parseInt(paletteSize.value);
    box.forEach(function (box, index) {
        if (index < size) {
            box.style.display = "flex";
        } else {
            box.style.display = "none";
        }
    });
});