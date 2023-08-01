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
    adjustDom("displayTurn", `${data.player1Name}'s turn`);
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
        return;
        // Adjust DOM to reflect endConditions
    }
    // Change current player
    // Change the dom, and change data.currentPlayer
    if (data.choice === 0) {
        changePlayer(data);
    } else if (data.choice === 1) {
        // easy ai
        easyAiMove(data);
        data.currentPlayer = "X";
        // Change back to player1
    }

};

const endConditions = (data) => {
    // 3 Potential options
    // Winner
    // Tie
    // Game not over yet
    if (checkWinner(data)) {
        // Adjust the DOM to reflect win
        let winnerName = data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDom("displayTurn", winnerName + " has won the game");
        return true;
    } else if (data.round === 9) {
        adjustDom("displayTurn", "It's a tie!")
        data.gameOver = true;
        // Adjust the DOM to reflect a tie
        return true;
    }
    return false;
};

const checkWinner = (data) => {
    let result = false;
    winningConditions.forEach((condition) => {
        if (
            data.board[condition[0]] === data.board[condition[1]] &&
            data.board[condition[1]] === data.board[condition[2]]
        ) {
            data.gameOver = true;
            result = true;
        }
    });
    return result;
}

const adjustDom = (className, textContent) => {
    const elem = document.querySelector(`.${className}`);
    elem.textContent = textContent;
}

const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
    //Adjust the DOM
    let displayTurnText = data.currentPlayer === "X" ? data.player1Name : data.player2Name
    adjustDom('displayTurn', `${displayTurnText}'s turn`)
}

const easyAiMove = (data) => {
    changePlayer(data)
    setTimeout (() => {
        let availableSpaces = data.board.filter(
            (space) => space !== "X" && space !== "O"
        );
        let move = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
        console.log(move);
        data.board[move] = data.player2;
        let box = document.getElementById(`${move}`);
        box.textContent = data.player2;
        box.classList.add("player2");
    }, 200);

    if (endConditions(data)) {
        return;
    }
    changePlayer(data);
}

