//Gameboard
const Gameboard = (function(){
    const board = new Array(9).fill(undefined);

    const getBoard = () =>{return board;};

    const markCell = (mark, index) =>{board[index] = mark;};

    const resetBoard = () =>{board.fill(undefined);};

    return{ getBoard, markCell, resetBoard};
})()

//Player factory function
const Player = (mark_temp) => {
    const mark = mark_temp;
    let winCount = 0;

    const getMark = () =>{return mark;};

    const addWinCount = ()=>{winCount+=1;};

    const getWinCount = () =>{return winCount;};

    return{
        getMark, addWinCount, getWinCount
    };
};

const player1 = Player("X");
const player2 = Player("O");
const player1Element = document.getElementById("p1");
const player2Element = document.getElementById("p2");
const nextBtn = document.querySelector("#next-btn");

nextBtn.addEventListener("click", () =>{
    Game.start();
});

const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell)=> {
        cell.addEventListener("click", () => {
            const index = Number(cell.dataset.index);
            Game.playRound(index);
        });
    });

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index] || "";
            cell.classList.remove("winner");
        });
    };

    const renderWinningCells = (cellsIndex) => {
        cellsIndex.forEach(winningCellIndex =>{
            cells[winningCellIndex].classList.add("winner");
        })
    };

    const renderScoreboard = () => {
        const scoreboard = document.querySelector(".scoreboard");
        scoreboard.textContent = `${player1.getWinCount()}:${player2.getWinCount()}`
    };

    return {renderBoard, renderScoreboard, renderWinningCells};
})();

//Game Function
const Game = (function(){
    let currentPlayer = player1;
    player1Element.classList.add("current")
    let round = 1;
    let gameOver = false;

    let gameCount = 0;
    const winCombos = [
            [0,1,2], //straight horizontal
            [3,4,5],
            [6,7,8],
            [0,3,6], //straight vertical
            [1,4,7],
            [2,5,8],
            [0,4,8], //diagonal
            [2,4,6]
        ];

    const updateCurrentPlayerUI = () => {
        player1Element.classList.toggle("current", currentPlayer === player1);
        player2Element.classList.toggle("current", currentPlayer === player2);
    };

    const checkWin = () =>{
        const board = Gameboard.getBoard();
        for(const combo of winCombos){
            const [a,b,c] = combo;

            if(board[a]!== undefined && board[a]===board[b] && board[b]===board[c]){
                DisplayController.renderWinningCells([a,b,c])
                return true;
            };
        };
        return false;
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        updateCurrentPlayerUI();
    }

    const playRound = (index) => {
        if ( gameOver ){
            return;
        }

        if ( Gameboard.getBoard()[index] !== undefined ){
            return;
        }

        Gameboard.markCell(currentPlayer.getMark(), index)

        DisplayController.renderBoard();

        if( checkWin() ){
            gameOver = true;
            currentPlayer.addWinCount();
            DisplayController.renderScoreboard();
            return
        }

        if(round === 9){
            gameOver=true;
            return;
        }

        round++;
        switchPlayer();
    }

    const start = () =>{
        Gameboard.resetBoard();
        currentPlayer = player1;
        round = 1;
        gameOver = false
        updateCurrentPlayerUI();
        DisplayController.renderBoard();
    };
    
    return {
        start, playRound
    };
})()


Game.start();
