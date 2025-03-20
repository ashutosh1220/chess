let pieces = document.querySelectorAll('.cell img'); // Selecting all chess piece images
let cells = document.querySelectorAll('.cell');

let selectedPiece = null;
let selectedCell = null;
let movementDone = false;
let turn = "white";

function selectionAndMovement() {
    pieces.forEach(piece => {
        piece.addEventListener('click', (event) => {
            requestAnimationFrame(() => {
                if (movementDone) return; // Prevent selecting a new piece after movement
                
                let pieceColor = piece.classList.contains("white_piece") ? "white" : "black";
                if (pieceColor !== turn) return; // Allow only current player's turn

                if (selectedPiece) resetSelection(selectedPiece); // Deselect previously selected piece

                piece.style.filter = "drop-shadow(0px 0px 3px orange)";
                selectedPiece = piece;
                selectedCell = piece.parentElement; // Store selected piece's cell
                movement();
            });
        });
    });
}

function movement() {
    if (!selectedPiece) return;

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            requestAnimationFrame(() => {
                if (cell.innerHTML === '' && !movementDone) { // Ensure cell is empty before moving
                    cell.appendChild(selectedPiece);
                    movementDone = true;
                    
                    restorePreviousSelection(); // Reset selection

                    turn = turn === "white" ? "black" : "white"; // Switch turns

                    setTimeout(() => {
                        movementDone = false;
                    }, 10);
                }
            });
        });
    });
}

function resetSelection(piece) {
    piece.style.filter = "";
}

function restorePreviousSelection() {
    if (selectedPiece) {
        resetSelection(selectedPiece);
        selectedPiece = null;
        selectedCell = null;
    }
}

selectionAndMovement();
