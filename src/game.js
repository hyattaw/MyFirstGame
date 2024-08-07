"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****************************************/
/*                                      */
/*           DEFINE CLASSES             */
/*                                      */
/****************************************/
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
var Num9x3 = /** @class */ (function () {
    function Num9x3(values) {
        if (values.length !== 9 || values.some(function (row) { return row.length !== 3; })) {
            throw new Error("Matrix must be 9x3.");
        }
        this.matrix = values;
    }
    Num9x3.prototype.getElement = function (row, col) {
        return this.matrix[row][col];
    };
    Num9x3.prototype.setElement = function (row, col, value) {
        this.matrix[row][col] = value;
    };
    return Num9x3;
}());
/****************************************/
/*                                      */
/*         DECLARE VARIABLES            */
/*                                      */
/****************************************/
var svgNs = "http://www.w3.org/2000/svg";
var svgElement = document.createElementNS(svgNs, "svg");
var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
var size = (screenWidth < screenHeight ? screenWidth : screenHeight) * 0.9;
var view = "0 0 ".concat(size, " ").concat(size);
var divBtn = document.getElementById("game");
var divSvg = document.getElementById("svg");
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
    var turnTracker = new Num9x3([
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
    return [theBoard, turnTracker];
}
function drawBoard(divElement) {
    var strokeWidth = .01;
    var strokeWidthHalf = strokeWidth / 2;
    var boardBackgroundColor = "#FF9999";
    var player1Color = "#99FF99";
    var player2Color = "#9999FF";
    var svgElement;
    svgElement.setAttributeNS(null, "width", "".concat(size)); // Set the desired width
    svgElement.setAttributeNS(null, "height", "".concat(size));
    svgElement.setAttributeNS(null, 'viewBox', "".concat(view));
    svgElement.style.backgroundColor = "#f0f0f0";
    var g1 = document.createElementNS(svgNs, "g");
    g1.setAttributeNS(null, "stroke", "black");
    g1.setAttributeNS(null, "stroke-width", String(strokeWidth));
    var rectBorder = document.createElementNS(svgNs, "rect");
    rectBorder.setAttributeNS(null, "x", String(strokeWidthHalf));
    rectBorder.setAttributeNS(null, "y", String(strokeWidthHalf));
    rectBorder.setAttributeNS(null, "width", "100%");
    rectBorder.setAttributeNS(null, "height", "100%");
    rectBorder.setAttributeNS(null, "fill", "pink");
    g1.appendChild(rectBorder);
    var rect0 = document.createElementNS(svgNs, "rect");
    rect0.setAttributeNS(null, "x", String(strokeWidthHalf));
    rect0.setAttributeNS(null, "y", String(strokeWidthHalf));
    rect0.setAttributeNS(null, "width", String(33.33333 - strokeWidthHalf));
    rect0.setAttributeNS(null, "height", String(33.33333 - strokeWidthHalf));
    rect0.setAttributeNS(null, "fill", "green");
    g1.appendChild(rect0);
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
    divElement.appendChild(svgElement);
}
var _a = initializeGame(), theBoard = _a[0], turnTracker = _a[1];
//initialize screen with start button
var btn1 = document.createElement('button');
btn1.textContent = 'Want to play tic-tac-toe?';
btn1.setAttribute("name", "startGame");
btn1.setAttribute("type", "button");
divBtn.appendChild(btn1);
btn1.addEventListener('click', function () {
    // delete button one
    btn1.remove();
    // Player 1 pick "x" or "o"
    var btn2X = 
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
    divBtn.appendChild(svgElement);
}
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
