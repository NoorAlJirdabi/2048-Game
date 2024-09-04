// Function to initialize the game
//     Create a 4x4 grid filled with zeros
//     Add a new random tile with a value of 2 or 4
//     Add another new random tile with a value of 2 or 4
//     Set the score to 0
//     Display the grid and score
// End function

// Function to add a new tile
//     Find all empty positions in the grid
//     If there are empty positions then
//         Select a random empty position
//         Place a new tile with a value of 2 (90% chance) or 4 (10% chance) at the selected position
//     End if
// End function

// Function to handle input (input)
//     If input is 'UP' then
//         Call function to move up
//     Else if input is 'DOWN' then
//         Call function to move down
//     Else if input is 'LEFT' then
//         Call function to move left
//     Else if input is 'RIGHT' then
//         Call function to move right
//     End if
//
//     If a move was made then
//         Call function to add a new tile
//         Display updated grid and score
//         If function checkGameOver returns true then
//             Display "Game Over"
//         End if
//     End if
// End function

// Function to slide a row or column (array)
//     Filter out all zeros from the array
//     Shift all non-zero values to one side
//     Fill the remaining spaces with zeros
//     Return the updated array
// End function

// Function to combine a row or column (array)
//     For each pair of adjacent tiles in the array (from right to left or bottom to top)
//         If two adjacent tiles have the same value then
//             Merge them by doubling the value of the first tile
//             Set the second tile to 0
//             Add the merged value to the score
//         End if
//     Return the updated array
// End function

// Function to move right
//     For each row in the grid
//         Call slide function with the row as an argument
//         Call combine function with the row as an argument
//         Call slide function with the row as an argument
//     End for
// End function

// Function to move left
//     For each row in the grid
//         Reverse the row
//         Call slide function with the row as an argument
//         Call combine function with the row as an argument
//         Call slide function with the row as an argument
//         Reverse the row back to its original order
//     End for
// End function

// Function to move up
//     For each column in the grid
//         Reverse the column
//         Call slide function with the column as an argument
//         Call combine function with the column as an argument
//         Call slide function with the column as an argument
//         Reverse the column back to its original order
//     End for
// End function

// Function to move down
//     For each column in the grid
//         Call slide function with the column as an argument
//         Call combine function with the column as an argument
//         Call slide function with the column as an argument
//     End for
// End function

// Function to check if the game is over
//     For each tile in the grid
//         If there is any empty tile then
//             Return false (Game is not over)
//         End if
//         If there is any tile that can be merged with an adjacent tile then
//             Return false (Game is not over)
//         End if
//     End for
//     Return true (No moves left, Game Over)
// End function

// Main game loop
//     While game is not over
//         Wait for user input (UP, DOWN, LEFT, RIGHT)
//         Call the function to handle input (input)
//     End while
