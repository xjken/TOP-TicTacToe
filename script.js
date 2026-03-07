//Gameboard
const Gameboard = (function(){
    const board = [];
    board.length = 9;

    const getBoard = () =>{
        return board;
    }

    const markCell = (mark, index) =>{
        board[index] = mark;
    }

    const resetBoard = () =>{
        board.fill(undefined)
    }

    return{
        getBoard, 
        markCell,
        resetBoard
    }
})()
