

/****************************************/
/*                                      */
/*        INCLUDE other files...        */
/*                                      */
/****************************************/
/// <reference lib="es2017.object" />
//import { SVG } from '@svgdotjs/svg.js';



/****************************************/
/*                                      */
/*           DEFINE CLASSES             */
/*                                      */
/****************************************/

class String3x3 {
  matrix: string[][];
  constructor(values: string[][]) {
    if (values.length !== 3 || values.some(row => row.length !== 3)) {
      throw new Error("Matrix must be 3x3.");
    }
    this.matrix = values;
  }
  getElement(row: number, col: number): string {
    return this.matrix[row][col];
  }
  setElement(row: number, col: number, value: string): void {
    this.matrix[row][col] = value;
  }
}
class Num9x3 {
  matrix: number[][];
  constructor(values: number[][]) {
    if (values.length !== 9 || values.some(row => row.length !== 3)) {
      throw new Error("Matrix must be 9x3.");
    }
    this.matrix = values;
  }
  getElement(row: number, col: number): number {
    return this.matrix[row][col];
  }
  setElement(row: number, col: number, value: number): void {
    this.matrix[row][col] = value;
  }
}


/****************************************/
/*                                      */
/*         DECLARE VARIABLES            */
/*                                      */
/****************************************/

const svgNs = "http://www.w3.org/2000/svg";
const svgElement = document.createElementNS(svgNs, "svg");
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const size: number = (screenWidth < screenHeight ? screenWidth : screenHeight) * 0.9;
const view = `0 0 ${size} ${size}`;
const divBtn = document.getElementById("game");
const divSvg = document.getElementById("svg");







/****************************************/
/*                                      */
/*           DEFINE FUNCTIONS           */
/*                                      */
/****************************************/

function initializeGame(): [String3x3, Num9x3] {
  const theBoard: String3x3 = new String3x3([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const turnTracker: Num9x3 = new Num9x3([
    [-1, -1, -1], //turn1: player, row, col
    [-1, -1, -1], //turn2: ...
    [-1, -1, -1], // -1 initial values
    [-1, -1, -1], // for Player: 1=player1; 2=player2 
    [-1, -1, -1], // for row/col: 0..2 (0-indexed)
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
  ]);
  return [theBoard, turnTracker]
}

function drawBoard(divElement: any): any {
  const strokeWidth: number = .01;
  const strokeWidthHalf: number = strokeWidth/2;
  const boardBackgroundColor: string = "#FF9999"
  const player1Color: string = "#99FF99"
  const player2Color: string = "#9999FF"

  var svgElement: any;
  svgElement.setAttributeNS(null, "width", `${size}`); // Set the desired width
  svgElement.setAttributeNS(null, "height", `${size}`);
  svgElement.setAttributeNS(null, 'viewBox', `${view}`);
  svgElement.style.backgroundColor = "#f0f0f0";

  var g1 = document.createElementNS(svgNs, "g");
  g1.setAttributeNS(null,       "stroke", "black");
  g1.setAttributeNS(null, "stroke-width", String(strokeWidth));

  var rectBorder = document.createElementNS(svgNs, "rect");
  rectBorder.setAttributeNS(null,      "x", String(strokeWidthHalf));
  rectBorder.setAttributeNS(null,      "y", String(strokeWidthHalf));
  rectBorder.setAttributeNS(null,  "width", "100%");
  rectBorder.setAttributeNS(null, "height", "100%");
  rectBorder.setAttributeNS(null,   "fill", "pink");
  g1.appendChild(rectBorder);

  var rect0 = document.createElementNS(svgNs, "rect");
  rect0.setAttributeNS(null,      "x", String(strokeWidthHalf));
  rect0.setAttributeNS(null,      "y", String(strokeWidthHalf));
  rect0.setAttributeNS(null,  "width", String(33.33333 - strokeWidthHalf));
  rect0.setAttributeNS(null, "height", String(33.33333 - strokeWidthHalf));
  rect0.setAttributeNS(null,   "fill", "green");
  g1.appendChild(rect0);


  var lineLeft = document.createElementNS(svgNs, "line");
  lineLeft.setAttributeNS(null, "x1", "33.3333%");
  lineLeft.setAttributeNS(null, "y1",        "0");
  lineLeft.setAttributeNS(null, "x2", "33.3333%");
  lineLeft.setAttributeNS(null, "y2",     "100%");
  g1.appendChild(lineLeft);

  var lineRight = document.createElementNS(svgNs, "line");
  lineRight.setAttributeNS(null, "x1", "66.6666%");
  lineRight.setAttributeNS(null, "y1", "0");
  lineRight.setAttributeNS(null, "x2", "66.6666%");
  lineRight.setAttributeNS(null, "y2", "100%");
  g1.appendChild(lineRight);


  var lineUpper = document.createElementNS(svgNs, "line");
  lineUpper.setAttributeNS(null, "y1", "33.3333%");
  lineUpper.setAttributeNS(null, "x1", "0");
  lineUpper.setAttributeNS(null, "y2", "33.3333%");
  lineUpper.setAttributeNS(null, "x2", "100%");
  g1.appendChild(lineUpper);


  var lineLower = document.createElementNS(svgNs, "line");
  lineLower.setAttributeNS(null, "y1", "66.6666%");
  lineLower.setAttributeNS(null, "x1", "0");
  lineLower.setAttributeNS(null, "y2", "66.6666%");
  lineLower.setAttributeNS(null, "x2", "100%");
  g1.appendChild(lineLower);

  svgElement.appendChild(g1);
  divElement.appendChild(svgElement);

}




let [theBoard, turnTracker] = initializeGame();



//initialize screen with start button
const btn1: any = document.createElement('button');
btn1.textContent = 'Want to play tic-tac-toe?';
btn1.setAttribute("name", "startGame");
btn1.setAttribute("type", "button");
divBtn.appendChild(btn1);

btn1.addEventListener('click', () => {
  // delete button one
  btn1.remove();
  // Player 1 pick "x" or "o"
const btn2X: any = 
  // reset game board
  initializeGame();

  // draw board
 drawBoard(divBtn);
  // drawSvgGrid(svgElement);
//  alert(Object.entries(`${svgElement.getBoundingClientRect()}`).map(([key, value]) => `${key}: ${value}`).join("; "));


  // Add selector for who goes first

  //Capture input

  //redraw board

  //Record move

  //Win? or Repeat

  // Display win

  //reset game


});





function drawSvgGrid(svgElement: any) {
  svgElement.setAttributeNS(null, "width", `${size}`); // Set the desired width
  svgElement.setAttributeNS(null, "height", `${size}`);
  svgElement.setAttributeNS(null, 'viewBox', `${view}`);
  svgElement.style.backgroundColor = "#f0f0f0";

  var g1 = document.createElementNS(svgNs, "g");
  g1.setAttributeNS(null, "stroke", "black");
  g1.setAttributeNS(null, "stroke-width", "1%");

  var rectBorder = document.createElementNS(svgNs, "rect");
  rectBorder.setAttributeNS(null, "x", "0");
  rectBorder.setAttributeNS(null, "y", "0");
  rectBorder.setAttributeNS(null, "width", "100%");
  rectBorder.setAttributeNS(null, "height", "100%");
  rectBorder.setAttributeNS(null, "fill", "pink");
  g1.appendChild(rectBorder);

  var lineLeft = document.createElementNS(svgNs, "line");
  lineLeft.setAttributeNS(null, "x1", "33.3333%");
  lineLeft.setAttributeNS(null, "y1", "0");
  lineLeft.setAttributeNS(null, "x2", "33.3333%");
  lineLeft.setAttributeNS(null, "y2", "100%");
  g1.appendChild(lineLeft);

  var lineRight = document.createElementNS(svgNs, "line");
  lineRight.setAttributeNS(null, "x1", "66.6666%");
  lineRight.setAttributeNS(null, "y1", "0");
  lineRight.setAttributeNS(null, "x2", "66.6666%");
  lineRight.setAttributeNS(null, "y2", "100%");
  g1.appendChild(lineRight);


  var lineUpper = document.createElementNS(svgNs, "line");
  lineUpper.setAttributeNS(null, "y1", "33.3333%");
  lineUpper.setAttributeNS(null, "x1", "0");
  lineUpper.setAttributeNS(null, "y2", "33.3333%");
  lineUpper.setAttributeNS(null, "x2", "100%");
  g1.appendChild(lineUpper);


  var lineLower = document.createElementNS(svgNs, "line");
  lineLower.setAttributeNS(null, "y1", "66.6666%");
  lineLower.setAttributeNS(null, "x1", "0");
  lineLower.setAttributeNS(null, "y2", "66.6666%");
  lineLower.setAttributeNS(null, "x2", "100%");
  g1.appendChild(lineLower);

  svgElement.appendChild(g1);
  divBtn.appendChild(svgElement);


}

/*
alert(Object.entries(`${svgElement.getBoundingClientRect()}`).map(([key, value]) => `${key}: ${value}`).join("; "));

*/


document.addEventListener('pointerup', (event) => {
  if (event.pointerType === 'touch') {
    let col: number = null, row: number = null;

    if (event.clientX <= screenWidth * 1 / 3) { col = 0; }
    else if (event.clientX <= (screenWidth) * 2 / 3) { col = 1; }
    else { col = 2; }

    if (event.clientX <= screenWidth * 1 / 3) { row = 0; }
    else if (event.clientX <= (screenWidth) * 2 / 3) { row = 1; }
    else { row = 2; }
  } else if (event.pointerType === 'mouse') { }
});






/*
event.clientX
event.clientY:
event.target
.pointerType
.isPrimary -- used to detect first finger

   */


function handleEvent(event) {
  const y = event.clientY;
  const screenHeight = window.innerHeight;

  switch (true) {
    case y < screenHeight / 3:
      console.log('Event in first third');
      break;
    case y < (2 * screenHeight) / 3:
      console.log('Event in middle third');
      break;
    default:
      console.log('Event in last third');
  }
}
