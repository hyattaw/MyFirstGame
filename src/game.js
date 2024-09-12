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
var svgNs = "http://www.w3.org/2000/svg";
var svgElement = document.createElementNS(svgNs, "svg");
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var size = (screenWidth <= screenHeight ? screenWidth : screenHeight) * 0.9;
var view = "0 0 ".concat(size, " ").concat(size);
var divGame = document.getElementById("game");
var elementSvg = document.getElementById("svg");
var boardBackgroundColor = "#FF9999";
var boardLineColor = "#0000FF";
var player1Color = "#99FF99";
var player2Color = "#9999FF";
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
function drawSvgGrid(svgElement) {
    svgElement.setAttributeNS(null, "width", "".concat(size)); // Set the desired width
    svgElement.setAttributeNS(null, "height", "".concat(size));
    svgElement.setAttributeNS(null, 'viewBox', "".concat(view));
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
    divGame.appendChild(svgElement);
}
// let [theBoard, turnTracker] = initializeGame();
//initialize screen with start button
var btnStartGame = document.createElement('button');
btnStartGame.textContent = 'Want to play tic-tac-toe?';
btnStartGame.setAttribute("name", "startGame");
btnStartGame.setAttribute("type", "button");
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
/*
alert(Object.entries(`${svgElement.getBoundingClientRect()}`).map(([key, value]) => `${key}: ${value}`).join("; "));

*/
document.addEventListener('pointerup', function (event) {
    if (event.pointerType === 'touch') {
        var col = null, row = null;
        if (event.clientX <= screenWidth * 1 / 3) {
            col = 0;
        }
        else if (event.clientX <= (screenWidth) * 2 / 3) {
            col = 1;
        }
        else {
            col = 2;
        }
        if (event.clientX <= screenWidth * 1 / 3) {
            row = 0;
        }
        else if (event.clientX <= (screenWidth) * 2 / 3) {
            row = 1;
        }
        else {
            row = 2;
        }
    }
    else if (event.pointerType === 'mouse') { }
});
/*
event.clientX
event.clientY:
event.target
.pointerType
.isPrimary -- used to detect first finger

   */
function handleEvent(event) {
    var y = event.clientY;
    var screenHeight = window.innerHeight;
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
