const GameBoard = document.querySelector("#gameboard");
const PlayerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;

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
    startPieces.forEach( (startPiece, i) => {
        const square = document.createElement('div');

        square.classList.add('square');
        // square.classList.add('beige');
        square.innerHTML = startPiece;
        square.setAttribute('square-id', i);

        const row = Math.floor( (63 - i) / 8) + 1;
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        }

        else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")

        }

        if (i <= 15) {
            square.firstChild.firstChild.classList.add("black")
        }

        GameBoard.append(square);

    })
}

createBoard();