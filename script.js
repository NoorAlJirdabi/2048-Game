document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('#game-board')
  const scoreDisplay = document.querySelector('#score-value')
  const newButton = document.querySelector('#new-game-btn')
  const undoButton = document.querySelector('#undo-btn')
  const modal = document.getElementById('game-over-modal')
  const modalMessage = document.getElementById('modal-message')
  const restartButton = document.getElementById('restart-btn')
  const timerDisplay = document.getElementById('timer-value') // Timer Display

  let grid = []
  let score = 0
  let gameWon = false
  let gameOver = false
  let previousGrid = []
  let previousScore = 0
  let timeLeft = 120
  let timerInterval

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
    timeLeft = 120
    timerDisplay.textContent = timeLeft
    hideModal()
    startTimer()
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
        tile.classList.add('tile', 'new', 'merged')
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
          showModal('You Win!')
        }
      }
    }
    return row
  }

  const slideAndCombine = (row) => {
    let slideRow = slide(row)
    let combineRow = combine(slideRow)
    return slide(combineRow)
  }

  const moveLeft = () => {
    for (let i = 0; i < 4; i++) {
      grid[i] = slideAndCombine(grid[i])
    }
  }

  const moveRight = () => {
    for (let i = 0; i < 4; i++) {
      grid[i] = slideAndCombine(grid[i].slice().reverse()).reverse()
    }
  }

  const moveDown = () => {
    for (let i = 0; i < 4; i++) {
      let column = [grid[0][i], grid[1][i], grid[2][i], grid[3][i]].reverse()
      let newColumn = slideAndCombine(column).reverse()
      for (let j = 0; j < 4; j++) {
        grid[j][i] = newColumn[j]
      }
    }
  }

  const moveUp = () => {
    for (let i = 0; i < 4; i++) {
      let column = [grid[0][i], grid[1][i], grid[2][i], grid[3][i]]
      let newColumn = slideAndCombine(column)
      for (let j = 0; j < 4; j++) {
        grid[j][i] = newColumn[j]
      }
    }
  }

  const checkGameOver = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          return false
        }
        if (i < 3 && grid[i][j] === grid[i + 1][j]) {
          return false
        }
        if (j < 3 && grid[i][j] === grid[i][j + 1]) {
          return false
        }
      }
    }
    return true
  }

  const move = (direction) => {
    if (gameOver || gameWon) {
      return true
    }
    let moved = false
    switch (direction) {
      case 'left':
        savePreviousState()
        moveLeft()
        moved = true
        break
      case 'right':
        savePreviousState()
        moveRight()
        moved = true
        break
      case 'up':
        savePreviousState()
        moveUp()
        moved = true
        break
      case 'down':
        savePreviousState()
        moveDown()
        moved = true
        break
    }

    if (moved) {
      addNewTile()
      if (checkGameOver()) {
        gameOver = true
        showModal('Game Over!')
        stopTimer()
      }
    }
  }

  const savePreviousState = () => {
    previousGrid = grid.map((row) => [...row])
    previousScore = score
  }

  const undoMove = () => {
    if (previousGrid.length) {
      grid = previousGrid.map((row) => [...row])
      score = previousScore
      updateBoard()
    }
  }

  const showModal = (message) => {
    modalMessage.textContent = message
    modal.classList.remove('hidden')
    stopTimer()
  }

  const hideModal = () => {
    modal.classList.add('hidden')
  }

  const startTimer = () => {
    timerInterval = setInterval(() => {
      timeLeft--
      timerDisplay.textContent = timeLeft

      if (timeLeft <= 0) {
        clearInterval(timerInterval)
        showModal('Time Up! Game Over!')
        gameOver = true
      }
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(timerInterval)
  }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        move('up')
        break
      case 'ArrowDown':
        move('down')
        break
      case 'ArrowLeft':
        move('left')
        break
      case 'ArrowRight':
        move('right')
        break
    }
  })

  newButton.addEventListener('click', startGame)
  undoButton.addEventListener('click', undoMove)
  restartButton.addEventListener('click', startGame)

  startGame()
})
