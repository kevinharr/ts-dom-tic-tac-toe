/*-------------------------------- Constants --------------------------------*/
const winningCombos: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  
  /*---------------------------- Variables (state) ----------------------------*/
  let turn: number, winner: boolean, tie: boolean, board: number[]
  
  
  /*------------------------ Cached Element References ------------------------*/
  const squareEls:NodeList = document.querySelectorAll('.sqr')!;
  const messageEl:HTMLElement = document.getElementById('message')!;
  const resetBtnEl:HTMLButtonElement = document.querySelector('button')!;
   
  /*----------------------------- Event Listeners -----------------------------*/
  
  document.querySelector('.board')!.addEventListener('click', handleClick)
  resetBtnEl.addEventListener('click', init)
  /*-------------------------------- Functions --------------------------------*/
  
  init()
  
  function init():void {
    board = [0, 1, 0, -1, 0, 1, -1, 0, 0]
    turn = 1
    winner = false
    tie = false
    render()
  }
  
  function placePiece(idx: number) {
    board[idx] = turn
  }
  
  function handleClick(evt:MouseEvent):void {
    const target = evt.target as HTMLElement;
    if (!target.id) {
      return;
    }
    const sqIdx = parseInt(target.id.replace('sq', ''))
  
    if (isNaN(sqIdx) || board[sqIdx] || winner) return
    placePiece(sqIdx)
    checkForTie()
    checkForWinner()
    switchPlayerTurn()
    render()
  }
  
  function checkForTie() {
    if (board.includes(0)) return
    tie = true
  }
  
  function checkForWinner():void {
    winningCombos.forEach(combo => {
      if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
        winner = true
      }
    })
  }
  
  function switchPlayerTurn() {
    if (winner) return
    turn *= -1
  }
  
  
  function render():void {
    updateBoard()
    updateMessage()
  }
  
  function updateBoard():void {
    board.forEach((boardVal, idx) => {
      if (boardVal === 1) {
        squareEls[idx].textContent = 'X'
      } else if (boardVal === -1) {
        squareEls[idx].textContent = 'O'
      } else {
        squareEls[idx].textContent = ''
      }
    })
  }
  
  function updateMessage():void {
    if (!winner && !tie) {
      messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn!`
    } else if (!winner && tie) {
      messageEl.textContent = "Cat's game! Meow!!!"
    } else {
      messageEl.textContent = `Congratulations! ${turn === 1 ? 'X' : 'O'} wins! `
    }
  }