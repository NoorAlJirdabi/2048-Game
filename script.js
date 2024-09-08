document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('#game-board')
  const scoreDisplay = document.querySelector('#score-value')
  const newButton = document.querySelector('#new-game-btn')
  const statusMessage = document.querySelector('#status-message')

  let grid = []
  let score = 0
  let gameWon = false
  let gameOver = false

  const createGrid = () => {
    const grid = []

    for (let row = 0; row < 4; row++) {
      const newRow = []

      for (let col = 0; col < 4; col++) {
        newRow.push(0)
      }

      grid.push(newRow)
    }

    return grid
  }

  const startGame = () => {
    grid = createGrid()
    score = 0
    gameWon = false
    gameOver = false
    statusMessage.textContent = ''
    updateBoard()
    addNewTile()
    addNewTile()
  }

  newButton.addEventListener('click', startGame)

  startGame()
})
