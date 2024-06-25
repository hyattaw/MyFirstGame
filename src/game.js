/// <reference lib="es2017.object" />
/*
import { SVG } from '@svgdotjs/svg.js';
*/
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
            throw new Error("Matrix must be 3x3.");
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
function initializeGame() {
    var theBoard = new String3x3([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    var turnTracker = new Num9x3([
        [-1, -1, -1], //turn1: player, row, col
        [-1, -1, -1], //turn2: ...
        [-1, -1, -1], // -1 indicates no entry
        [-1, -1, -1], // col1: player0 / player1 
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]);
    return [theBoard, turnTracker];
}
var _a = initializeGame(), theBoard = _a[0], turnTracker = _a[1];
var xmlns = "http://www.w3.org/2000/svg";
var ns = null;
var svgElement = document.createElementNS(xmlns, "svg");
var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
var size = (screenWidth < screenHeight ? screenWidth : screenHeight) * 0.9;
var view = "0 0 ".concat(size, " ").concat(size);
var divBtn = document.getElementById("game");
var divSvg = document.getElementById("svg");
//initialize screen with start button
var btn1 = document.createElement('button');
btn1.textContent = 'Want to play tic-tac-toe?';
btn1.setAttribute("name", "startGame");
btn1.setAttribute("type", "button");
divBtn.appendChild(btn1);
btn1.addEventListener('click', function () {
    // delete button one
    btn1.remove();
    // reset game board
    // initializeGame();
    // draw board
    drawSvgGrid(svgElement);
    alert(Object.entries("".concat(svgElement.getBoundingClientRect())).map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, ": ").concat(value);
    }).join("; "));
    // Add selector for who goes first
    //Capture input
    //redraw board
    //Record move
    //Win? or Repeat
    // Display win
    //reset game
});
function drawSvgGrid(svgElement) {
    svgElement.setAttributeNS(ns, "width", "".concat(size)); // Set the desired width
    svgElement.setAttributeNS(ns, "height", "".concat(size));
    svgElement.setAttributeNS(ns, 'viewBox', "".concat(view));
    svgElement.style.backgroundColor = "#f0f0f0";
    var g1 = document.createElementNS(xmlns, "g");
    g1.setAttributeNS(ns, "stroke", "black");
    g1.setAttributeNS(ns, "stroke-width", "1%");
    var rectBorder = document.createElementNS(xmlns, "rect");
    rectBorder.setAttributeNS(ns, "x", "0");
    rectBorder.setAttributeNS(ns, "y", "0");
    rectBorder.setAttributeNS(ns, "width", "100%");
    rectBorder.setAttributeNS(ns, "height", "100%");
    rectBorder.setAttributeNS(ns, "fill", "pink");
    g1.appendChild(rectBorder);
    var lineLeft = document.createElementNS(xmlns, "line");
    lineLeft.setAttributeNS(ns, "x1", "33.3333%");
    lineLeft.setAttributeNS(ns, "y1", "0");
    lineLeft.setAttributeNS(ns, "x2", "33.3333%");
    lineLeft.setAttributeNS(ns, "y2", "100%");
    g1.appendChild(lineLeft);
    var lineRight = document.createElementNS(xmlns, "line");
    lineRight.setAttributeNS(ns, "x1", "66.6666%");
    lineRight.setAttributeNS(ns, "y1", "0");
    lineRight.setAttributeNS(ns, "x2", "66.6666%");
    lineRight.setAttributeNS(ns, "y2", "100%");
    g1.appendChild(lineRight);
    var lineUpper = document.createElementNS(xmlns, "line");
    lineUpper.setAttributeNS(ns, "y1", "33.3333%");
    lineUpper.setAttributeNS(ns, "x1", "0");
    lineUpper.setAttributeNS(ns, "y2", "33.3333%");
    lineUpper.setAttributeNS(ns, "x2", "100%");
    g1.appendChild(lineUpper);
    var lineLower = document.createElementNS(xmlns, "line");
    lineLower.setAttributeNS(ns, "y1", "66.6666%");
    lineLower.setAttributeNS(ns, "x1", "0");
    lineLower.setAttributeNS(ns, "y2", "66.6666%");
    lineLower.setAttributeNS(ns, "x2", "100%");
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
