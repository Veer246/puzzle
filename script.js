const puzzleContainer = document.getElementById('puzzle-container');
const imageSrc = 'puzzle.jpg'; // Replace with your image URL
const gridSize = 4;
let pieces = [];

function createPuzzle() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
            piece.draggable = true;
            piece.dataset.index = row * gridSize + col;
            piece.addEventListener('dragstart', onDragStart);
            piece.addEventListener('dragover', onDragOver);
            piece.addEventListener('drop', onDrop);
            puzzleContainer.appendChild(piece);
            pieces.push(piece);
        }
    }
}

function shuffle() {
    const shuffledPieces = pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = '';
    shuffledPieces.forEach(piece => puzzleContainer.appendChild(piece));
}

function onDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('text/plain');
    const targetIndex = e.target.dataset.index;
    const draggedPiece = pieces[draggedIndex];
    const targetPiece = pieces[targetIndex];

    // Swap positions in the DOM
    const draggedClone = draggedPiece.cloneNode(true);
    const targetClone = targetPiece.cloneNode(true);

    puzzleContainer.replaceChild(draggedClone, targetPiece);
    puzzleContainer.replaceChild(targetClone, draggedPiece);

    // Swap positions in the pieces array
    pieces[draggedIndex] = targetClone;
    pieces[targetIndex] = draggedClone;

    // Re-assign event listeners
    draggedClone.addEventListener('dragstart', onDragStart);
    draggedClone.addEventListener('dragover', onDragOver);
    draggedClone.addEventListener('drop', onDrop);

    targetClone.addEventListener('dragstart', onDragStart);
    targetClone.addEventListener('dragover', onDragOver);
    targetClone.addEventListener('drop', onDrop);
}

createPuzzle();
