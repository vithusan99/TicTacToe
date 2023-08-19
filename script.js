const cellEle = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const x_class = 'x';
const cirlce_class = 'circle';
const winn_combination = [
    [0,1,2],[0,3,6],[0,4,8],[2,4,6],[1,4,7],[2,5,8],[3,4,5],[6,7,8]
]
let circleTurn;
const winningMessageEle = document.querySelector('[data-win-message-text]');
const winMessageDivEle = document.getElementById('win-msg');
const restartBtn= document.getElementById('restart-btn');

startGame();

restartBtn.addEventListener('click',startGame)

function startGame(){
    circleTurn = false
    cellEle.forEach(cell=>{
        cell.classList.remove(x_class);
        cell.classList.remove(cirlce_class)
        cell.removeEventListener('click',handleCellClick)
        cell.addEventListener('click',handleCellClick,{once:true})
    });
    setBoardHoverClass()  
    winMessageDivEle.classList.remove('show')  
}

function endGame(draw){
    if(draw){
        winningMessageEle.innerText= "Match draws :| "
    }else{
        winningMessageEle.innerText= `${circleTurn ? "O's":"X's"} Wins!`
    }
    winMessageDivEle.classList.add('show')
}

function isDraw(){
    return [...cellEle].every(cell=>{
        return cell.classList.contains(x_class) || cell.classList.contains(cirlce_class)
    })
}

function handleCellClick(e){
    const cell = e.target
    const currentClass = circleTurn ? cirlce_class : x_class;
    placeMark(cell,currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }else if (isDraw()){
        endGame(true)
    }else{
        swapTurn()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurn(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(x_class);
    board.classList.remove(cirlce_class);
    if(circleTurn){
        board.classList.add(cirlce_class)
    }else{
        board.classList.add(x_class)
    }
}

function checkWin(currentClass){
    return winn_combination.some(combination=>{
        return combination.every(index=>{
            return cellEle[index].classList.contains(currentClass);
        })
    })
}