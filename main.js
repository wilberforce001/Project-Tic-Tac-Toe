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
    data.board = [0, 1, 2, 3, 4, 5, , 7, 8];
    data.player1 = "X"
    data.player2 = "O"
    data.round = 0;
    data.curentPlayer = "X";
    data.gameOver = false;
}

const InitializeGame = (data) => {
    // Initialize game variables
    InitializeVariables(data);

    console.log(data);
    // Add event listeners to the gameboard
    
}