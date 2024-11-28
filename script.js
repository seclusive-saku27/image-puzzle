let selectedPiece = null;

// Function to load an image and apply it as the background for each puzzle piece
function loadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const pieces = document.querySelectorAll('.puzzle-piece');
                pieces.forEach((piece, index) => {
                    piece.style.backgroundImage = `url(${event.target.result})`;
                    piece.style.backgroundSize = '300px 300px';
                    piece.style.backgroundPosition = `${-(index % 3) * 100}px ${-Math.floor(index / 3) * 100}px`;
                });
                shufflePieces(); // Shuffle after loading image
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Function to shuffle pieces randomly
function shufflePieces() {
    const container = document.getElementById('puzzleContainer');
    const pieces = Array.from(container.children);
    pieces.sort(() => Math.random() - 0.5); // Random sort
    pieces.forEach(piece => container.appendChild(piece)); // Re-append in new order
}

// Function to handle piece click for swapping
document.getElementById('puzzleContainer').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('puzzle-piece')) {
        if (!selectedPiece) {
            // Select the first piece
            selectedPiece = target;
            selectedPiece.classList.add('selected');
        } else {
            // Swap background positions between two pieces
            const tempBackground = selectedPiece.style.backgroundPosition;
            selectedPiece.style.backgroundPosition = target.style.backgroundPosition;
            target.style.backgroundPosition = tempBackground;

            selectedPiece.classList.remove('selected');
            selectedPiece = null; // Reset selected piece
        }
    }
});
