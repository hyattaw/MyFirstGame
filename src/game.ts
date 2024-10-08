

/****************************************/
/*                                      */
/*        INCLUDE other files...        */
/*                                      */
/****************************************/
import * as Snap from 'snapsvg';


/****************************************/
/*                                      */
/*           DEFINE CLASSES             */
/*                                      */
/****************************************/

/*  represents Tic-Tac-Toe grid  */
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

/*  tracks each of 9 turns [player, row, col, value]*/
class Num9x4 {
  matrix: number[][];
  constructor(values: number[][]) {
    if (values.length !== 9 || values.some(row => row.length !== 4)) {
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

const screenWidth:number = window.innerWidth;
const screenHeight:number = window.innerHeight;
const size:number = (screenWidth <= screenHeight ? screenWidth : screenHeight) * 0.9;
const view:string = `0 0 ${size} ${size}`;
const boardBackgroundColor: string = "#FF9999";
const boardLineColor: string = "#0000FF";
const player1Color: string = "#99FF99";
const player2Color: string = "#9999FF";
const divGame:any = document.createElement('div');
divGame.setAttribute("id", "game");
document.body.appendChild(divGame);






/****************************************/
/*                                      */
/*           DEFINE FUNCTIONS           */
/*                                      */
/****************************************/

function initializeGame(): [String3x3, Num9x4] {
  let theBoard: String3x3 = new String3x3([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  let turnTracker: Num9x4 = new Num9x4([
    [-1, -1, -1, -1], //turn1: [player, row, col, value]
    [-1, -1, -1, -1], //turn2: ...
    [-1, -1, -1, -1], // -1 initial values
    [-1, -1, -1, -1], // for Player: 1=player1; 2=player2 
    [-1, -1, -1, -1], // for row/col: 0..2 (0-indexed)
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1]
  ]);
  return [theBoard, turnTracker]
}

function drawBoard(
    size: number, 
    boardBackgroundColor: string, 
    boardLineColor: string, 
    player1Color: string, 
    player2Color: string) 
{
  const strokeWidthSingle = size*0.01;
  const strokeWidthDouble = size*0.02;
  const third = size/3;

  const svgImg = Snap(size,size);
  svgImg.attr({
    "fill": boardBackgroundColor,
    "stroke-width": strokeWidthSingle,
    "stroke": boardLineColor
  });
  const rectUL = svgImg.rect(      0,      0,third,third);
  const rectUC = svgImg.rect(  third,      0,third,third);
  const rectUR = svgImg.rect(third*2,      0,third,third);
  const rectCL = svgImg.rect(      0,  third,third,third);
  const rectCC = svgImg.rect(  third,  third,third,third);
  const rectCR = svgImg.rect(third*2,  third,third,third);
  const rectBL = svgImg.rect(      0,third*2,third,third);
  const rectBC = svgImg.rect(  third,third*2,third,third);
  const rectBR = svgImg.rect(third*2,third*2,third,third);

}

// let [theBoard, turnTracker] = initializeGame();



//initialize screen with start button
const btnStartGame: any = document.createElement('button');
btnStartGame.innerHTML = "Click to play tic-tac-toe";
btnStartGame.setAttribute("name", "startGame");
btnStartGame.setAttribute("type", "button");
btnStartGame.setAttribute("id", "btnStartGame");
divGame.appendChild(btnStartGame);

/*
<!-- Rounded switch -->
  Player 1 Symbol:
  <label class="switch" for="Player1Symbol">
    <input type="checkbox" id="Player1Symbol">
    <span class="slider round"></span>
  </label>
*/
const chkBoxPlayer1Symbol:any = document.createElement('input');
chkBoxPlayer1Symbol.setAttribute("type", "checkbox");
chkBoxPlayer1Symbol.setAttribute("id", "Player1Symbol");
chkBoxPlayer1Symbol.setAttribute("name", "Player1Symbol");
divGame.appendChild(chkBoxPlayer1Symbol);

btnStartGame.addEventListener('click', () => {
  // delete button one
 // btnStartGame.remove();
  // Player 1 pick "x" or "o"
//  const btnPlayer1SymbolX: any = document.getElementById("Player1Symbol");
  // reset game board
//  initializeGame();

  // draw board
  // drawBoard(size, boardBackgroundColor, boardLineColor, player1Color, player2Color); 

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




