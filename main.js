const form = document.querySelector("#myForm");

form.addEventListener("submit", (event) => {
    // preveent page refresh
    event.preventDefault();

    // Initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector(".modal-wrapper").setAttribute("hidden", true);
    InitializeGame(data);
});

const InitializeVariables = (data) => {
    data.choice = +data.choice;
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    data.player1 = "X"
    data.player2 = "O"
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
}

const addEventListenersToGameBoard = (data) => {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', (event) => {
            playMove(event.target, data)
        })
    })
}

const InitializeGame = (data) => {
    // Initialize game variables
    InitializeVariables(data);

    // Add event listeners to the gameboard
    addEventListenersToGameBoard(data);
}

const playMove = (box, data) => {
    // Is game over? If game over, do not do anything
    if (data.gameOver) {
        return;
    }
    // Check if game box has a letter in it, if so, don't do anything 
    if (data.board[box.id] === "X" || data.board[box.id] === "O") {
        return;
    }

    // Adjust the DOM for player move, and then check win conditions
    data.board[box.id] = data.curentPlayer;
    box.textContent = data.currentPlayer;
    box.className = data.currentPlayer === "X" ? "box player1" : "box player2";

    console.log(box, data);
}