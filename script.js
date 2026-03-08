//Gameboard
const Gameboard = (function(){
    const board = new Array(9).fill(undefined);

    const getBoard = () =>{
        return board;
    };

    const markCell = (mark, index) =>{
        board[index] = mark;
    };

    const resetBoard = () =>{
        board.fill(undefined);
    };

    return{
        getBoard, 
        markCell,
        resetBoard
    };
})()

//Player factory function
const Player = (mark_temp) => {
    const mark = mark_temp;
    let winCount = 0;

    const getMark = () =>{
        return mark;
    };

    const addWinCount = ()=>{
        winCount+=1;
    };

    const getWinCount = () =>{
        return winCount;
    };

    return{
        getMark, addWinCount, getWinCount
    };
};
const player1 = Player("X");
const player2 = Player("O");

//Game Function
const Game = (function(){
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

    const promptMove = () =>{
        const index = prompt(`Where to mark
                [0][1][2]
                [3][4][5]
                [6][7][8]
            `)
        return index;
    };

    const validatePromptMove = () => {
        let index = promptMove();
        while(!(Gameboard.getBoard()[index]===undefined)){
            index = promptMove();
        }
        return index;
    };

    const checkWin = () =>{
        const board = Gameboard.getBoard();
        for(const combo of winCombos){
            const [a,b,c] = combo;

            if(board[a]!== undefined && board[a]===board[b] && board[b]===board[c]){
                return true;
            };
        };
        return false;
    };

    const start = () =>{
        let round = 1
        let hasWinner = false;
        const maxRound = 9;
        while(round<=maxRound){
            //if round == odd number, player 1 move, else player 2 move
            let index;
            if(!(round%2===0)){
                console.log(`player 1 move`);
                //Prompt and validate player move (need to change method later)
                index = validatePromptMove();
                //mark cell
                Gameboard.markCell(player1.getMark(),index);
                //check win
                const winner = checkWin();
                if(winner){
                    console.log(`Player 1 wins!`);
                    hasWinner = true;
                    player1.addWinCount();
                    break;
                };
            } else{
                console.log(`player 2 move`);
                //Prompt and validate player move (need to change method later)
                index = validatePromptMove();
                //mark cell
                Gameboard.markCell(player2.getMark(),index);
                //check win
                const winner = checkWin();
                if(winner){
                    console.log(`Player 2 wins!`);
                    hasWinner = true;
                    player2.addWinCount();
                    break;
                };
            };
            
            if(!hasWinner){
                console.log(`It's a draw!`)
            }

            round++; 
            console.log(Gameboard.getBoard());
        };
    };

    return {
        start, promptMove
    };
})()


Game.start();

