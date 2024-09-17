import Snap from "snapsvg";

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const size = (screenWidth <= screenHeight ? screenWidth : screenHeight) * 0.9;
const view = "0 0 ".concat(size, " ").concat(size);
const boardBackgroundColor = "#FF9999";
const boardLineColor = "#0000FF";
const player1Color = "#99FF99";
const player2Color = "#9999FF";
const strPlayer1Symbol = "X"; //default value

/*  Create game Div  */
const divStartGame = document.createElement("div");
    divStartGame.setAttribute("id", "divStartGame");
/*  Create intro paragraph  */
const pIntro = document.createElement("p");
    pIntro.setAttribute("id","intro");
    pIntro.innerText = "To play Tic-Tac-Toe, move the selector to the first player's desired symbol, then click the Start button.";
    divStartGame.appendChild(pIntro);

/*  Player1 Symbol Selection  */
const chkBoxPlayer1Symbol = document.createElement('input');
    chkBoxPlayer1Symbol.setAttribute("type", "checkbox");
    chkBoxPlayer1Symbol.setAttribute("id", "Player1Symbol");
const lblPlayer1Symbol = document.createElement("label");
    lblPlayer1Symbol.setAttribute("for", "Player1Symbol");
    lblPlayer1Symbol.setAttribute("class", "slider");
const divSliderSwitch = document.createElement("div");
    divSliderSwitch.setAttribute("id","divPlayer1SymbolSelect");
    divSliderSwitch.setAttribute("class","switch");
    divSliderSwitch.appendChild(chkBoxPlayer1Symbol);
    divSliderSwitch.appendChild(lblPlayer1Symbol);
divStartGame.appendChild(divSliderSwitch);

/*  Start button  */
const btnStart = document.createElement("button");
btnStart.setAttribute("id","btnStart");
btnStart.setAttribute("class","circle");
btnStart.setAttribute("onclick","fnStartGame()")
const btnStartText = document.createElement("span")
btnStartText.innerHTML = "Start";
btnStart.appendChild(btnStartText)
divStartGame.appendChild(btnStart);

/*  append divStartGame to document body  */
    document.body.appendChild(divStartGame);


/*  onclick of btnStart  */
function fnStartGame(){
    const strPlayer1Symbol = document.getElementById('Player1Symbol').checked ? "O" : "X";   
    document.body.removeChild(document.getElementById("divStartGame"))
    const pPlayerSymb = document.createElement("p");
    pPlayerSymb.setAttribute("id","pPlayerSymb");
    pPlayerSymb.innerHTML = `Player1 Symbol is ${strPlayer1Symbol}`;
    document.body.appendChild(pPlayerSymb);
}

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

