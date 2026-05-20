# 🎨 PincelStudio — Generador de Paletas de Colores

PincelStudio es una aplicación web para crear, explorar y guardar paletas de colores para tus proyectos de diseño.

---

## 📖 Manual de Usuario

### Pantalla de Inicio

Al abrir la aplicación verás la pantalla principal con una presentación animada de paletas de ejemplo. Desde aquí puedes hacer clic en el botón **Crear** para ir al generador de paletas.

---

### Generador de Paletas

#### 1. Generar una paleta

Haz clic en el botón **GENERAR PALETA** para crear una combinación de colores aleatoria. Cada vez que presiones el botón se generará una nueva paleta con colores únicos.

#### 2. Elegir el tamaño de la paleta

Usa el selector **TAMAÑO** para elegir cuántos colores quieres en tu paleta:

- **6 colores**
- **8 colores**
- **9 colores** (por defecto)

#### 3. Cambiar el formato del código de color

Usa el toggle **HEX / HSL** para alternar entre los dos formatos de visualización del color:

- **HEX** — Formato hexadecimal, por ejemplo `#de516f`
- **HSL** — Formato de matiz, saturación y luminosidad, por ejemplo `hsl(349, 67%, 59%)`

#### 4. Copiar un color

Haz clic en el ícono 📄 (documento) dentro de cualquier tarjeta de color para copiar su código HEX al portapapeles. Verás un ✅ de confirmación cuando se haya copiado correctamente.

#### 5. Bloquear un color

¿Te gustó un color pero quieres cambiar el resto? Haz clic en el ícono 🔒 (candado) de esa tarjeta para bloquearlo. Los colores bloqueados **no cambian** cuando generas una nueva paleta. Para desbloquear, vuelve a hacer clic en el candado.

#### 6. Guardar una paleta

Haz clic en el botón ❤️ para guardar la paleta actual en la sección **Paletas guardadas**, que aparece debajo del generador.

---

### Paletas Guardadas

En la sección **Paletas guardadas** encontrarás todas las paletas que has marcado con ❤️.

- Haz clic en cualquier **muestra de color** para copiar su código HEX al portapapeles.
- Haz clic en el ícono 🗑️ para eliminar una paleta guardada.

> ⚠️ Las paletas guardadas se almacenan solo durante la sesión actual. Si recargas la página, se perderán.

---

## ⌨️ Flujo de uso recomendado

1. Selecciona el tamaño de paleta que necesitas.
2. Haz clic en **GENERAR PALETA** varias veces hasta encontrar combinaciones que te gusten.
3. Bloquea los colores que quieras conservar con 🔒.
4. Sigue generando para reemplazar solo los colores no bloqueados.
5. Cuando estés satisfecho, guarda la paleta con ❤️ o copia los colores individuales con 📄.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript 

---

## 📁 Estructura del proyecto

```
PincelStudio/
├── index.html          # Página de inicio
├── crear.html          # Generador de paletas
├── css/
│   ├── reset.css       # Estilos de reset
│   ├── style.css       # Estilos de la página de inicio
│   └── crear.css       # Estilos del generador
├── javascript/
│   └── script.js       # Lógica de la aplicación
└── img/
    ├── logo.png
    └── Favicon.png
```

## ⚙️ Manual Técnico — Decisiones de Diseño
 
### Stack tecnológico
 
Se optó por **HTML, CSS y JavaScript sin frameworks ni dependencias externas. La razón principal es que la aplicación es lo suficientemente simple como para no justificar la carga de una librería adicional, y esto mantiene el proyecto liviano, fácil de desplegar y sin pasos de compilación.
 
La única dependencia externa es la fuente **Playfair Display** cargada desde Google Fonts, elegida por su carácter tipográfico elegante acorde a una herramienta de diseño visual.
 
---
 
### Generación de colores aleatorios
 
**Decisión:** Los colores se generan construyendo un string HEX carácter a carácter, seleccionando de forma aleatoria dentro del arreglo `[0–9, A–F]`.
 
```js
const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
 
function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}
```
 
**Por qué así:** Es directo y produce colores completamente aleatorios en el espacio de color RGB. Se eligió sobre alternativas como generar un número entero y convertirlo a HEX con `toString(16)` porque la construcción carácter a carácter es más explícita y fácil de leer para quienes revisen el código.
 
**Limitación conocida:** `Math.random()` no es criptográficamente seguro, pero para este caso de uso (generación de paletas de diseño) es más que suficiente.
 
---
 
### Conversión HEX → HSL
 
**Decisión:** La conversión se implementó de forma manual en `hexToHsl()`, sin usar APIs del navegador como `canvas` o `getComputedStyle`.
 
```js
function hexToHsl(hex) {
    // Normaliza a RGB en rango [0, 1]
    // Calcula luminosidad, saturación y matiz según la fórmula estándar
    // Retorna el string `hsl(h, s%, l%)`
}
```
 
**Por qué así:** La API del navegador no expone una función directa de conversión HEX → HSL. Usar un `canvas` o un elemento DOM como intermediario sería más costoso y menos transparente. La implementación matemática pura es portable, testeable de forma aislada y no depende del entorno del navegador.
 
---
 
### Sistema de bloqueo de colores
 
**Decisión:** El estado de bloqueo se gestiona con una clase CSS `locked` en el elemento `.box` y un atributo `data-locked` en el botón.
 
```js
// Al generar la paleta, se salta el box si está bloqueado
if (box.classList.contains('locked')) return;
```
 
**Por qué así:** En lugar de mantener un arreglo de estado separado en JavaScript, se usa el DOM como fuente de verdad. Esto simplifica la sincronización entre la lógica y la vista: no hay riesgo de que el estado JS y el estado visual se desincronicen.
 
---
 
### Paletas guardadas en memoria
 
**Decisión:** Las paletas guardadas se almacenan en el arreglo `savedPalettes` en memoria (sin `localStorage`).
 
```js
let savedPalettes = [];
 
heartBtn.addEventListener('click', () => {
    // Captura los colores visibles y los empuja al arreglo
    savedPalettes.push(currentPalette);
    renderSaved();
});
```
 
**Por qué así:** Mantiene la implementación simple para el alcance actual del proyecto. Los datos se pierden al recargar la página, lo cual es un trade-off aceptado conscientemente en esta versión.
 
**Mejora futura:** Persistir las paletas en `localStorage` para mantenerlas entre sesiones, o en un backend si se requiere sincronización entre dispositivos.
 
---
 
### Feedback visual con timeouts
 
**Decisión:** El mensaje "Paleta Generada ✅" y el ícono de confirmación al copiar usan `setTimeout` con limpieza del timeout anterior para evitar acumulación.
 
```js
let timeout;
function showMessage(texto) {
    if (timeout) clearTimeout(timeout);
    message.textContent = texto;
    message.classList.add("show");
    timeout = setTimeout(() => {
        message.classList.remove("show");
    }, 800);
}
```
 
**Por qué así:** Si el usuario hace clic varias veces seguidas, limpiar el timeout previo antes de crear uno nuevo evita que los mensajes se solapen o que el mensaje desaparezca antes de tiempo.
 
---
 
### Renderizado del DOM sin framework
 
**Decisión:** La sección de paletas guardadas se re-renderiza completamente con cada cambio (`savedList.innerHTML = ''` + reconstrucción).
 
```js
function renderSaved() {
    savedList.innerHTML = '';
    savedPalettes.forEach((palette, i) => {
        // Construye y añade cada fila al DOM
    });
}
```
 
**Por qué así:** Para el volumen de datos esperado (pocas paletas guardadas por sesión), el re-render completo es imperceptible y mucho más simple que implementar una reconciliación manual o usar un virtual DOM. La optimización prematura aquí no aportaría valor real.
 
---
 
### Tamaño de paleta controlado por visibilidad CSS
 
**Decisión:** En lugar de crear o destruir elementos del DOM al cambiar el tamaño de la paleta, todos los `.box` siempre existen en el HTML y se muestran u ocultan con `display: flex / none`.
 
```js
box.forEach(function (box, index) {
    box.style.display = index < size ? "flex" : "none";
});
```
 
**Por qué así:** Evita tener que re-registrar event listeners cada vez que cambia el tamaño. Los listeners se registran una sola vez al cargar la página y funcionan para todos los elementos, visibles o no.
 

# 🚀 Pasos para descargar y ejecutar PincelStudio en local

## Paso 1 — Descarga el proyecto

**Opción A: con Git**

```bash
git clone https://github.com/juandavid200010-wq/ProyectoM1_JuanDavidCamargo.git
```

**Opción B: sin Git**

1. Ve al repositorio en GitHub
2. Haz clic en el botón verde **Code**
3. Selecciona **Download ZIP**
4. Descomprime el archivo donde prefieras

---

## Paso 2 — Abre la carpeta en VS Code

1. Abre VS Code
2. Ve a **Archivo → Abrir carpeta**
3. Selecciona la carpeta `pincel-studio`

---

## Paso 3 — Instala la extensión Live Server

1. En VS Code abre el panel de extensiones con `Ctrl+Shift+X`
2. Busca **Live Server**
3. Haz clic en **Instalar**

---

## Paso 4 — Ejecuta la aplicación

1. En el explorador de VS Code, haz clic derecho sobre `index.html`
2. Selecciona **Open with Live Server**
3. El navegador se abre automáticamente en `http://127.0.0.1:5500`

> ⚠️ No abras `index.html` con doble clic desde el explorador de archivos.
> El portapapeles no funciona en el protocolo `file://`. Siempre usa Live Server.

---

## Alternativas a Live Server

**Python:**

```bash
cd pincel-studio
python -m http.server 8080
```
Abre `http://localhost:8080`

**Node.js:**

```bash
npm install -g serve
cd pincel-studio
serve .
```
Abre `http://localhost:3000`


# 🌐 Ver PincelStudio en línea
 
PincelStudio está disponible en línea sin necesidad de instalar nada.
 
👉 **[Abrir PincelStudio] https://github.com/juandavid200010-wq/ProyectoM1_JuanDavidCamargo.git**
 
---
 
# 🚀 Despliega tu propia versión en GitHub Pages
 
Si quieres tener tu propia copia de PincelStudio en línea, sigue estos pasos.
 
## Requisitos
 
- Tener una cuenta en [GitHub](https://github.com) (es gratis)
---
 
## Paso 1 — Haz un fork del repositorio
 
1. Ve al repositorio de  ProyectoM1_JuanDavidCamargo en GitHub
2. Haz clic en el botón **Fork** (esquina superior derecha)
3. Haz clic en **Create fork**
Esto crea una copia del proyecto en tu cuenta de GitHub.
 
---
 
## Paso 2 — Activa GitHub Pages en tu fork
 
1. Dentro de tu fork ve a la pestaña **Settings**
2. En el menú izquierdo haz clic en **Pages**
3. En la sección **Branch** selecciona `main`
4. Deja la carpeta como `/ (root)`
5. Haz clic en **Save**
---
 
## Paso 3 — Abre tu aplicación
 
Espera 1 o 2 minutos. Tu versión estará disponible en:
 
```
https://github.com/juandavid200010-wq/ProyectoM1_JuanDavidCamargo.git
```
 
Puedes encontrar el enlace exacto en **Settings → Pages**.