document.addEventListener("DOMContentLoaded", () => {
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    const form = document.querySelector("#myForm");
    const newGameBtn = document.querySelector("#restartBtn");
    
    const resetGameBtn = document.querySelector('#resetBtn');


    newGameBtn.addEventListener('click', () => {
        location.reload();
    })
    
    
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
    };

    const resetDom = () => {
        document.querySelectorAll(".box").forEach((box) => {
            box.className = "box";
            box.textContent = "";
            });
    };
    
    const addEventListenersToGameBoard = (data) => {
        document.querySelectorAll(".box").forEach((box) => {
            box.addEventListener("click", (event) => {
                playMove(event.target, data);
            });
        });
        resetGameBtn.addEventListener("click", () => {
            InitializeVariables(data);
            resetDom();
            adjustDom("displayTurn", `${data.player1Name}'s turn`);
        });
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
        data.board[box.id] = data.currentPlayer;
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
        } else if (data.choice === 2) {
            changePlayer(data);
            impossibleAIMove(data);
            
            if (endConditions(data)) {
                return;
            }
            changePlayer(data);
    
        }
    
    };
    
    const endConditions = (data) => {
        // 3 Potential options
        // Winner
        // Tie
        // Game not over yet
        if (checkWinner(data, data.currentPlayer)) {
            // Adjust the DOM to reflect win
            let winnerName = data.currentPlayer === "X" ? data.player1Name : data.player2Name;
            adjustDom("displayTurn", winnerName + " has won the game");
            return true;
        } else if (data.round === 9) {
            adjustDom("displayTurn", "It's a Tie!")
            data.gameOver = true;
            // Adjust the DOM to reflect a tie
            return true;
        }
        return false;
    };
    
    const checkWinner = (data, player) => {
        let result = false;
        winningConditions.forEach((condition) => {
            if (
                data.board[condition[0]] === player && 
                data.board[condition[1]] === player && 
                data.board[condition[2]] === player
            ) {
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
        let displayTurnText = data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDom('displayTurn', `${displayTurnText}'s turn`);
    };
    
    const easyAiMove = (data) => {
        changePlayer(data);
    
        data.round++;
        let availableSpaces = data.board.filter(
            (space) => space !== "X" && space !== "O"
        );
        let move = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
        data.board[move] = data.player2;
    
        setTimeout (() => {
            
            let box = document.getElementById(`${move}`);
            box.textContent = data.player2;
            box.classList.add("player2");
        }, 200);
    
         if (endConditions(data)) {
            return;
        }
        changePlayer(data);   
    };
    
    const impossibleAIMove = (data) => {
        data.round++;
        // Get best possible move from minimax alogorithm
    
        const move = minimax(data, "O").index;
    
        console.log("Move:", move);
    
        data.board[move] = data.player2;
        let box = document.getElementById(`${move}`);
    
        console.log("Box:", box);
        box.textContent = data.player2;
        box.classList.add("player2");
    
        console.log(data);
    };
    
    const minimax = (data, player) => {
        let availableSpaces = data.board.filter(
            (space) => space !== "X" && space !== "O"
        );
    
        if(checkWinner(data, data.player1)) {
            return {
                score: -100,
            };
        } else if (checkWinner(data, data.player2)) {
            return {
                score: 100,
            };
        } else if (availableSpaces.length === 0) {
            return {
                score: 0,
            };
        }
        // Check if winner, if player1 wins set score to -100
        // If tie, set score to 0
        // If win set score to 100
        const potentialMoves = [];
        // Loop over available spaces to get a list of all potential moves and check if wins
        for(let i = 0; i < availableSpaces.length; i++) {
            let move = {};
            move.index = data.board[availableSpaces[i]];
            data.board[availableSpaces[i]] = player;
            if(player === data.player2) {
                move.score = minimax(data, data.player1).score;
            } else {
                move.score = minimax(data, data.player2).score;
            }
    
            // reset the move on the board
            data.board[availableSpaces[i]] = move.index;
            // Push the potential move to the array
            potentialMoves.push(move);
        }
        let bestMove = 0;
        if(player === data.player2) {
            let bestScore = -10000;
            for(let i = 0; i < potentialMoves.length; i++) {
                if(potentialMoves[i].score > bestScore) {
                    bestScore = potentialMoves[i].score;
                    bestMove = i;
                }
            } 
        } else  {
                let bestScore = 10000;
                for (let i = 0; i < potentialMoves.length; i++) {
                    if (potentialMoves[i].score < bestScore) {
                        bestScore = potentialMoves[i].score;
                        bestMove = i;
                    }
                }          
          }
          return potentialMoves[bestMove];
    };
    
});