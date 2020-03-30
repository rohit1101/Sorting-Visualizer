import mergeSort from "./algorithms/mergeSort.js";
import bubbleSort from "./algorithms/bubbleSort.js";
import quickSort from "./algorithms/quicksort.js";

// -----------SELECTING THINGS FROM DOM-------------

const toolbar = document.querySelector(`.toolbar`);
const rootContainer = document.querySelector(`.rootContainer`);
const generateNewArray = document.querySelector(`#generateArray`);
const changeSize = document.querySelector(`#changeSize`);
const buttonsArray = document.querySelectorAll(`.algoButton`);
const sortButton = document.querySelector(`#sortButton`);
const bodyContainer = document.querySelector(`.bodyContainer`);

//----------CUSTOM VARIABLES OR OBJECTS---------------

let height = rootContainer.offsetHeight - toolbar.offsetHeight;
let width = rootContainer.offsetWidth;
let MAX_INTERVAL_VALUE = height - 40;
let MIN_INTERVAL_VALUE = 10;
const scaling = {
  changeSize: 10
};
let stateArray = [];

const stateObject = {
  algorithm: -1,
  isRunnning: false
};

//-------------FUNCTION FOR RESETTING ARRAY----------

async function resetArray() {
  const currentArray = [];
  for (let i = 0; i < scaling.changeSize; i++) {
    currentArray.push(
      randomNumberFromInterval(MIN_INTERVAL_VALUE, MAX_INTERVAL_VALUE)
    );
  }
  stateArray = [...currentArray];
}

function randomNumberFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//-----------FUNCTION FOR RENDERING ARRAY-----------------

function renderingArray() {
  const currentArray = stateArray;
  return currentArray.map((value, index) => {
    return `  <div class="arrayBar" id="arrayBar_${index}" data-key= "${index}" style="height: ${value}px ; width : ${scaleWidth(
      scaling.changeSize
    )}px ";></div>`;
  });
}

//----------------FUNCTION FOR DISPLAYING ARRAY ---------------

function resetAndRenderArray() {
  resetArray().then(function() {
    const currentArray = renderingArray().join(``);
    bodyContainer.innerHTML = currentArray;
  });
}

resetAndRenderArray();

//------------FUNCTION FOR HANDLING SIZE--------------

function handleSize(e) {
  const value = e.currentTarget.value;
  scaling[changeSize.id] = value;
  resetAndRenderArray();
  setTimeout(() => {
    for (let i = 0; i < scaling.changeSize; i++) {
      document.getElementById(`arrayBar_${i}`).style.width = scaleWidth(
        scaling.changeSize
      );
    }
  }, 100);
}

const scaleWidth = scaleLen => {
  let widthOfEachBar = Math.floor(width / (3 * scaleLen));
  return widthOfEachBar;
};

//--------------FUNCTION FOR SORT BUTTON------------

function handleSort(e) {}
//make listeners for each sort

//----------FUNCTION FOR ALGO BUTTONS-----------

function handleAlgoButtons(e) {
  if (stateObject.isRunnning) return;
  //show sort button
  const current = e.currentTarget.id;
}

//------------EVENT LISTENERTS--------------

generateNewArray.addEventListener(`click`, resetAndRenderArray);
sortButton.addEventListener(`click`, handleSort);
changeSize.addEventListener(`input`, handleSize);
buttonsArray.forEach(button => {
  button.addEventListener(`click`, handleAlgoButtons);
});
