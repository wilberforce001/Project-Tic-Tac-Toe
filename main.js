const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

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
    if (data.gameOver || data.round > 8) {
        return;
    }
    // Check if game box has a letter in it, if so, don't do anything 
    if (data.board[box.id] === "X" || data.board[box.id] === "O") {
        return;
    }

    // Adjust the DOM for player move, and then check win conditions
    data.board[box.id] = data.curentPlayer;
    box.textContent = data.currentPlayer;
    box.classList.add(data.currentPlayer === "X" ? "player1" : "player2");
    // Increse the round number 
    data.round++;
    console.log(box, data);

    //Check end condtions 
    if(endConditions(data)) {
        // Adjust DOM to reflect endConditions
    }
};

const endConditions = (data) => {

}
