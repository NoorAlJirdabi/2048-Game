// 1. Grid Initialization: The game initializes a 4x4 grid filled with zeros (representing empty spaces). Two random tiles are added to the grid at the start.

// 2. Slide Function: The slide function moves all non-empty tiles in a row or column towards one side, filling the remaining spaces with zeros.

// 3. Combine Function: The combine function merges adjacent tiles with the same value, adding their values together and leaving an empty space.

// 4. Movement Functions: Functions moveLeft, moveRight, moveUp, and moveDown handle the movement of tiles in different directions, by calling the slide and combine functions, and then adding a new tile.

// 5. Game Over Check: After each move, the game checks if there are no possible moves left, in which case it declares a game over.

// 6. Event Handling: The game listens for keyboard inputs (arrow keys) to trigger the movement of tiles and updates the grid accordingly.

// 7. Score Handling: The score is updated each time tiles are merged, and the updated score is displayed on the screen.
