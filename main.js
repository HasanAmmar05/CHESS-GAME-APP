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
    
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const taken = e.target.classList.contains('piece'); 
    const valid = checkIfValid(e.target);
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo); // corrected
    
    if (correctGo) {
        // must check this first
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            changePlayer()
        }
    }



    if (taken && !takenByOpponent) {
        infoDisplay.textContent = "You cannot go here!";
        setTimeout(() => infoDisplay.textContent = "", 2000)
        changePlayer()
        return
    }

    if (valid) {
        e.target.append(draggedElement);
        changePlayer();

        return
    }
    
    
}



function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;
    console.log(targetId)
    console.log(startId)
    console.log(piece)
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