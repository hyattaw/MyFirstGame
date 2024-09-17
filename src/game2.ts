const screenWidth:number = window.innerWidth;
const screenHeight:number = window.innerHeight;
const size:number = (screenWidth <= screenHeight ? screenWidth : screenHeight) * 0.9;
const view:string = `0 0 ${size} ${size}`;
const boardBackgroundColor: string = "#FF9999";
const boardLineColor: string = "#0000FF";
const player1Color: string = "#99FF99";
const player2Color: string = "#9999FF";

const divGame = document.createElement("div");
divGame.innerHTML = "<p style='font-size:3em;'>Hello</p>"
document.body.appendChild(divGame);

