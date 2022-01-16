
//Variables
const box = document.getElementById("box");
const eraser = document.getElementsByClassName("eraser");
const rainbow = document.getElementsByClassName("rainbow");
const trashcan = document.getElementsByClassName("trashcan");
var rangeslider = document.getElementById("myRange");
var title = document.getElementById("title");
var size = 10;
var currMode = "color";
var currentColor = "black";
var colorPicker = new iro.ColorPicker('#picker', {
  width: 100,
  color: "f00"
});

//Functions
function makeRows(rows, cols) {
  box.style.setProperty('--grid-rows', rows);
  box.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let newDiv = document.createElement("div");
    var size = (44 / rows) + "vw";
    newDiv.style.height = size;
    newDiv.style.width = size;
    newDiv.style.backgroundColor = "white";
    newDiv.setAttribute('id', "div"+(c+1));
    newDiv.addEventListener("mouseover", changeColor);
    box.appendChild(newDiv).className += "gridItem black0";

  };
};

function updateCurrentMode(mode) {
  currMode = mode;
}

changeColor = (e) => {

  if (currMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  }
      
    else if (currMode === "color") {
      e.target.style.backgroundColor = currentColor;
    }
    else {
      e.target.style.backgroundColor = 'white';
    }

}

function resetBoard() {
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
  makeRows(rangeslider.value, rangeslider.value);
}

function onColorChange(color) {
  console.log(color.hexString);
  currMode = "color";
  currentColor = color.hexString;
}

//Event Listeners
colorPicker.on('color:change', onColorChange);

rangeslider.oninput = function() {
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
  size = rangeslider.value;
  title.textContent = "Etch-A-Sketch! " + size+"x"+size;
  makeRows(size, size);
}

rainbow.onclick = () => updateCurrentMode('rainbow');
trashcan.onclick = () => {
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
  makeRows(size, size);
};

window.onload = function() {
  makeRows(10, 10)  
}







