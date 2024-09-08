const GameBoard = document.querySelector("#gameboard");
const PlayerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = 'black';
PlayerDisplay.textContent = "black"

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
];

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPiece;
        square.setAttribute('square-id', i);
        
        // Set draggable on the piece div
        if (square.firstChild) {
            square.firstChild.setAttribute('draggable', true);
        }

        const row = Math.floor((63 - i) / 8) + 1;
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        }

        if (i <= 15) {
            square.firstChild.classList.add("black")
        }

        if (i >= 48) {
            square.firstChild.classList.add("white")
        }

        GameBoard.append(square);
    })
}

createBoard();

const allSquares = document.querySelectorAll(".square");

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
})

let startPositionId
let draggedElement

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
    if (!draggedElement.classList.contains(playerGo)) {
        e.preventDefault();
        return false;
    }
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();

    const correctGo = draggedElement.classList.contains(playerGo);
    const targetSquare = e.target.classList.contains('square') ? e.target : e.target.parentNode; // Ensure we target the square
    const valid = checkIfValid(targetSquare);
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    const takenByOpponent = targetSquare.firstChild && targetSquare.firstChild.classList.contains(opponentGo); // Correct target check

    if (correctGo) {
        // Capture scenario
        if (takenByOpponent && valid) {
            targetSquare.innerHTML = ""; // Remove the opponent's piece
            targetSquare.append(draggedElement);
            changePlayer();
            return;
        }

        // Regular move
        if (valid && !targetSquare.firstChild) {
            targetSquare.append(draggedElement);
            changePlayer();
            return;
        }
    }

    // Invalid move
    infoDisplay.textContent = "You cannot go here!";
    setTimeout(() => infoDisplay.textContent = "", 2000);
}




function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;
    console.log(targetId)
    console.log(startId)
    console.log(piece)


    switch(piece){
        case 'pawn' :
            const starterRow = [8, 9, 10, 11, 12 ,13 , 14, 15];
            if(
            starterRow.includes(startId) && startId + width * 2 === targetId
            || startId + width === targetId 
            || startId + width - 1 === targetId && document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild
            || startId + width + 1 === targetId && document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild
            ) {
                return true;
            }
            break;

            case 'knight' :
                if (
                    startId + width * 2 + 1 === targetId || 
                    startId + width * 2 - 1 === targetId || 
                    startId + width - 2 === targetId ||
                    startId + width + 2 === targetId ||
                    startId - width * 2 + 1 === targetId || 
                    startId - width * 2 - 1 === targetId || 
                    startId - width - 2 === targetId || 
                    startId - width + 2 === targetId  

                ) {
                    return true;
                }
                break;

            case 'bishop' :
                if (
                    startId + width + 1 === targetId ||
                    startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild   ||
                    startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild ||
                    startId + width * 4 + 4 && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild ||
                    startId + width * 5 + 5 && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild ||
                    startId + width * 6 + 6 && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`).firstChild ||
                    startId + width * 7 + 7 && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`).firstChild ||

                    // -- 

                    startId - width - 1 === targetId ||
                    startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild   ||
                    startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild ||
                    startId - width * 4 - 4 && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild ||
                    startId - width * 5 - 5 && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild ||
                    startId - width * 6 - 6 && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`).firstChild ||
                    startId - width * 7 - 7 && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`).firstChild ||
                )
    }
}




function changePlayer() {
    if (playerGo === "black") {
        reverseIds();
        playerGo = "white";
        PlayerDisplay.textContent = 'white'
    } else {
        revertIds();
        playerGo = "black";
        PlayerDisplay.textContent = "black";
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}