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

  const addNewTile = () => {
    let emptyTiles = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          emptyTiles.push({ x: i, y: j })
        }
      }
    }
    if (emptyTiles.length > 0) {
      const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
      grid[x][y] = Math.random() < 0.9 ? 2 : 4
      updateBoard()
    }
  }

  const updateBoard = () => {
    board.innerHTML = ''
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const tile = document.createElement('div')
        tile.classList.add('tile')
        const value = grid[i][j]

        if (value) {
          tile.textContent = value
          tile.classList.add(`tile-${value}`)
        }
        board.appendChild(tile)
      }
    }
    scoreDisplay.textContent = score
  }

  const slide = (row) => {
    const filteredRow = row.filter((val) => val !== 0)
    while (filteredRow.length < 4) {
      filteredRow.push(0)
    }
    return filteredRow
  }

  const combine = (row) => {
    for (let i = 0; i < 3; i++) {
      if (row[i] === row[i + 1] && row[i] !== 0) {
        row[i] = row[i] * 2
        row[i + 1] = 0
        score += row[i]

        if (row[i] === 2048) {
          gameWon = true
          statusMessage.textContent = 'You win!'
        }
      }
    }
    return row
  }

  newButton.addEventListener('click', startGame)

  startGame()
})
