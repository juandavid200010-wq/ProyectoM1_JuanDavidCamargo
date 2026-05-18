const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
const btn = document.getElementById("btn");
const box = document.querySelectorAll(".box");
const hexColors = document.querySelectorAll(".hexColors");
const hslColor = document.querySelectorAll(".hslColor");
const paletteSize = document.getElementById("paletteSize");
const options = document.querySelectorAll(".option");
const slider = document.querySelector(".slider");
const message = document.getElementById("message");
const padlockBtns = document.querySelectorAll(".padlock-btn");
const heartBtn = document.querySelector('.heart-btn');
const savedList = document.getElementById('saved-list');



box.forEach(b => b.classList.add('sleeping'));



hslColor.forEach(function(color){
    color.style.display = "none";
});


// Acciones despues tocar el boton generar paleta


btn.addEventListener("click", function () {
    generatePalette();
    showMessage("Paleta Generada ✅");
    showPaletteCodes();
    document.querySelectorAll(".box").forEach(box => {
        box.classList.add("paused");
    });
});

//Genera la paleta de colores. 

function generatePalette () {
    box.forEach(b => b.classList.add('sleeping'));
    const size = parseInt(paletteSize.value) || 9;
    box.forEach(function (box, index) {
        if (index < size) {
            box.style.display = "flex";
            if (box.classList.contains('locked')) return; //Bloqueo de color  
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
} 

// Se obtiene un numero random.

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}

//Muestra mensaje "Paleta generada"

let timeout;
function showMessage(texto){
    if (timeout) clearTimeout(timeout);  // ← Solo limpia si existe
    message.textContent = texto;
    message.classList.add("show");
    timeout = setTimeout(() => {
        message.classList.remove("show");
    }, 800);
}





//  Función para convertir de hex a hsl


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


// Boton TOGGLE HEX / HSL


options.forEach(function(option, index){
    option.addEventListener("click", function(){
        options.forEach(function(btn){
            btn.classList.remove("active");
        });
        option.classList.add("active");
        slider.style.transform = `translateX(${index * 100}%)`;
        const format = option.dataset.format;
        if(format === "hex"){
            hexColors.forEach(function(color){
                color.style.display = "inline";
            });
            hslColor.forEach(function(color){
                color.style.display = "none";
            });
        }
        else{
            hexColors.forEach(function(color){
                color.style.display = "none";
            });
            hslColor.forEach(function(color){
                color.style.display = "inline";
            });
        }
    });
});



// boton para copiar los colores 


padlockBtns.forEach(btn => {
    btn.addEventListener('click', () => {
    const box = btn.closest(".box");
    const colorText = box.querySelector(".hexColors").innerText;
    navigator.clipboard.writeText(colorText)
        .then(() => {
        // Feedback visual al usuario
        btn.innerText = "✅";
        setTimeout(() => {
        btn.innerHTML = "&#128196;";
        }, 800);
        })
    .catch(err => console.error('Error al copiar:', err));
    });
});


// Bloquea los colores con el candado 

document.querySelectorAll('.box').forEach(card => {
    const lockBtn = card.querySelector('.lock-btn');
    const copyBtn = card.querySelector('.padlock-btn');
    lockBtn.addEventListener('click', () => {
        const isLocked = lockBtn.dataset.locked === 'true';
        if (isLocked) {
            lockBtn.dataset.locked = 'false';
            lockBtn.innerHTML = '&#128274;';
            card.classList.remove('locked');
    }   else {
            lockBtn.dataset.locked = 'true';
            lockBtn.innerHTML = '&#128275;';
            card.classList.add('locked');
    }
    });
});


// Guarda las paletas los colores 


let savedPalettes = [];
heartBtn.addEventListener('click', () => {
    const currentPalette = [];
    box.forEach(b => {
        if (b.style.display !== 'none') {
            currentPalette.push({
                hex: b.querySelector('.hexColors').textContent,
                hsl: b.querySelector('.hslColor').textContent
            });
        }
    });
    savedPalettes.push(currentPalette);renderSaved();
});

function renderSaved() {
    savedList.innerHTML = '';
    savedPalettes.forEach((palette, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex; gap:8px; ' +  
        ' margin-bottom:12px; align-items:center;';
    palette.forEach(color => {
        const swatch = document.createElement('div');
        swatch.title = color.hex;
        swatch.style.cssText = `
        width: 50px; height: 50px;
        background: ${color.hex};
        border-radius: 8px;
        cursor: pointer;
        border: 0.5px solid #ccc;`;
        swatch.addEventListener('click', () => {
        navigator.clipboard.writeText(color.hex);
    });
    row.appendChild(swatch);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&#128465;';
    deleteBtn.addEventListener('click', () => {
        savedPalettes.splice(i, 1);
        renderSaved();
    });
    row.appendChild(deleteBtn);
    savedList.appendChild(row);
});
}


// Funcion para visualizar los codigo de colores y simbolos

    function showPaletteCodes(){
document.querySelectorAll(".hexColors, .lock-btn, .padlock-btn, .hslColor").forEach(el => {
        el.classList.add("visible");
        });
    }
