var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var score = 0;
var rows = 9;
var cols = 9;

var currTile;
var otherTile;

window.onload = function () {
    startGame();

    window.setInterval(function () {
        crushCandy();
        slideCandy();
        generateCandy();
        document.getElementById("score").innerText = score;

    }, 100)
}





function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}



function startGame() {
    for (let r = 0; r < rows; r++) {
        let rows = [];
        for (let c = 0; c < cols; c++) {
            // <img id = "0-0">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "img/" + randomCandy() + ".png";

            //DRAG FUNCTIONALITY

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);



            document.getElementById("board").append(tile);
            rows.push(tile);


        }
        board.push(rows);

    }
    console.log(board);
}

function dragStart() {
    //this is the tile that is being dragged
    currTile = this;

}

function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {
    this.style.border = "none";
}
function dragDrop() {
    //this is the tile that is being dropped on
    otherTile = this;
}
function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);


    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;


    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {

        currImg = currTile.src;
        otherImg = otherTile.src;
        otherTile.src = currImg;
        currTile.src = otherImg;

        let validMove = checkValid();
        if (!validMove) {
            currImg = currTile.src;
            otherImg = otherTile.src;
            otherTile.src = currImg;
            currTile.src = otherImg;


        }
    }
}

function crushCandy() {
    //crushFive();
    //crushFour();
    crushThree();
}

function crushThree() {
    //check for horizontal matches
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 2; c++) {
            let candy1 = board[r][c].src;
            let candy2 = board[r][c + 1].src;
            let candy3 = board[r][c + 2].src;

            if (candy1 === candy2 && candy2 === candy3 && !candy1.includes("blank")) {
                board[r][c].src = "./img/blank.png";
                board[r][c + 1].src = "./img/blank.png";
                board[r][c + 2].src = "./img/blank.png";
                score+=30;
            }
        }
    }

    //check for vertical matches
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c].src;
            let candy2 = board[r + 1][c].src;
            let candy3 = board[r + 2][c].src;

            if (candy1 === candy2 && candy2 === candy3 && !candy1.includes("blank")) {
                board[r][c].src = "./img/blank.png";
                board[r + 1][c].src = "./img/blank.png";
                board[r + 2][c].src = "./img/blank.png";
                score+=30;
            }

        }
    }
}


function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 2; c++) {
            let candy1 = board[r][c].src;
            let candy2 = board[r][c + 1].src;
            let candy3 = board[r][c + 2].src;

            if (candy1 === candy2 && candy2 === candy3 && !candy1.includes("blank")) {
                return true;
            }
        }
    }

    //check for vertical matches
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c].src;
            let candy2 = board[r + 1][c].src;
            let candy3 = board[r + 2][c].src;

            if (candy1 === candy2 && candy2 === candy3 && !candy1.includes("blank")) {
                return true;
            }
        }
    }
    return false;

}

function slideCandy() {
    for (let c = 0; c < cols; c++) {
        let ind = rows - 1; // start filling from the bottom row

        // Move all non-blank candies to the bottom
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind--;
            }
        }

        // Fill the rest with blanks
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./img/blank.png";
        }
    }
}


function generateCandy() {

    for (let c = 0; c < cols; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./img/" + randomCandy() + ".png";
        }
    }

}