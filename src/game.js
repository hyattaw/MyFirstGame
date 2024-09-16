"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****************************************/
/*                                      */
/*        INCLUDE other files...        */
/*                                      */
/****************************************/
var Snap = require("snapsvg");
/****************************************/
/*                                      */
/*           DEFINE CLASSES             */
/*                                      */
/****************************************/
/*  represents Tic-Tac-Toe grid  */
var String3x3 = /** @class */ (function () {
    function String3x3(values) {
        if (values.length !== 3 || values.some(function (row) { return row.length !== 3; })) {
            throw new Error("Matrix must be 3x3.");
        }
        this.matrix = values;
    }
    String3x3.prototype.getElement = function (row, col) {
        return this.matrix[row][col];
    };
    String3x3.prototype.setElement = function (row, col, value) {
        this.matrix[row][col] = value;
    };
    return String3x3;
}());
/*  tracks each of 9 turns [player, row, col, value]*/
var Num9x4 = /** @class */ (function () {
    function Num9x4(values) {
        if (values.length !== 9 || values.some(function (row) { return row.length !== 4; })) {
            throw new Error("Matrix must be 9x3.");
        }
        this.matrix = values;
    }
    Num9x4.prototype.getElement = function (row, col) {
        return this.matrix[row][col];
    };
    Num9x4.prototype.setElement = function (row, col, value) {
        this.matrix[row][col] = value;
    };
    return Num9x4;
}());
/****************************************/
/*                                      */
/*         DECLARE VARIABLES            */
/*                                      */
/****************************************/
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var size = (screenWidth <= screenHeight ? screenWidth : screenHeight) * 0.9;
var view = "0 0 ".concat(size, " ").concat(size);
var boardBackgroundColor = "#FF9999";
var boardLineColor = "#0000FF";
var player1Color = "#99FF99";
var player2Color = "#9999FF";
var divGame = document.createElement('div');
divGame.setAttribute("id", "game");
document.body.appendChild(divGame);
/****************************************/
/*                                      */
/*           DEFINE FUNCTIONS           */
/*                                      */
/****************************************/
function initializeGame() {
    var theBoard = new String3x3([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    var turnTracker = new Num9x4([
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
    return [theBoard, turnTracker];
}
function drawBoard(size, boardBackgroundColor, boardLineColor, player1Color, player2Color) {
    var strokeWidthSingle = size * 0.01;
    var strokeWidthDouble = size * 0.02;
    var third = size / 3;
    var svgImg = Snap(size, size);
    svgImg.attr({
        "fill": boardBackgroundColor,
        "stroke-width": strokeWidthSingle,
        "stroke": boardLineColor
    });
    var rectUL = svgImg.rect(0, 0, third, third);
    var rectUC = svgImg.rect(third, 0, third, third);
    var rectUR = svgImg.rect(third * 2, 0, third, third);
    var rectCL = svgImg.rect(0, third, third, third);
    var rectCC = svgImg.rect(third, third, third, third);
    var rectCR = svgImg.rect(third * 2, third, third, third);
    var rectBL = svgImg.rect(0, third * 2, third, third);
    var rectBC = svgImg.rect(third, third * 2, third, third);
    var rectBR = svgImg.rect(third * 2, third * 2, third, third);
}
// let [theBoard, turnTracker] = initializeGame();
//initialize screen with start button
var btnStartGame = document.createElement('button');
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
var chkBoxPlayer1Symbol = document.createElement('input');
chkBoxPlayer1Symbol.setAttribute("type", "checkbox");
chkBoxPlayer1Symbol.setAttribute("id", "Player1Symbol");
chkBoxPlayer1Symbol.setAttribute("name", "Player1Symbol");
divGame.appendChild(chkBoxPlayer1Symbol);
btnStartGame.addEventListener('click', function () {
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
