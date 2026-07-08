# Landmark Locator

Landmark Locator is an interactive map-based travel game where users guess the location of famous landmarks by clicking on a world map.

## Project Description

This project uses an interactive map to challenge users to find famous landmarks. The player clicks on the map to make a guess, submits the guess, and then sees the correct location. The game calculates the distance between the player's guess and the real landmark location, then gives a score based on accuracy.

## First Commit Progress

The first commit focused on setting up the project structure and building the basic interactive map.

## First Commit Built

- Created the main project files
- Added HTML structure
- Added CSS styling
- Connected Leaflet.js
- Displayed an interactive OpenStreetMap map
- Added click-to-place marker functionality
- Added a submit button
- Added the first sample landmark: Eiffel Tower, France

## Second Commit Progress

The second commit focused on adding the main game logic.

## Second Commit Built

- Added user guess marker
- Added correct answer marker
- Added a line between the guess and the correct location
- Added distance calculation using latitude and longitude
- Added score calculation
- Added result message showing distance and score
- Prevented users from changing their guess after submitting
- Turned the map from a basic demo into a playable first version

## Third Commit Progress

The third commit focused on expanding the game from one round into a multi-round experience.

## Third Commit Built

- Added multiple landmarks
- Added current round tracking
- Added total score tracking
- Made the Next Round button work
- Updated the target landmark dynamically
- Updated the round title dynamically
- Cleared old markers and lines between rounds
- Added a game-over state
- Displayed the final score after all landmarks are completed

## Fourth Commit Progress

The fourth commit focused on improving the learning experience and game flow.

## Fourth Commit Built

- Added hints for each landmark
- Added a Show Hint button
- Added a 100-point penalty for using a hint
- Added facts about each landmark after the user submits a guess
- Added a Restart Game button
- Added replay functionality after game over
- Improved button behavior during active rounds and game over
- Made the game more educational and complete

## Fifth Commit Progress

the fifth commit focused on saving player progress and improving score feedback.

## Fifth Commit Built

- Added high score display
- Added persistent high score saving with localStorage
- Loaded the saved high score when the page opens
- Compared final score against the saved high score
- Displayed a New high score message when the player beats the record
- Improved the score area layout
- Updated round text to show progress, such as Round 1 of 5

## Sixth Commit Built

- Added a 30-second timer for each round
- Added a timer display to the score panel
- Started the timer automatically at the beginning of each round
- Stopped timer when the user submits a guess
- Reset the timer when moving to the next round
- Added timeout handling when time reaches o
- Revealed the correct location when time runs out
- Gave 0 points for timed-out rounds
- Stopped the timer at game over restart

## Seventh Commit Progress

The seventh commit focused on adding difficulty levels.

## Seventh Commit Built

- Added Easy, Normal, and Hard difficulty options
- Set Easy mode to 45 seconds per round
- Set Normal mode to 30 seconds per round
- Set Hard mode to 15 seconds per round
- Connected the difficulty dropdown to the timer
- Restarted the game when the difficulty changes
- Disabled difficulty changes during active gameplay
- Re-enabled difficulty selection after restart or game over

## Eighth Commit Progress

The eighth commit focused on improving the high score system.

## Eighth Commit Built

- Added separate high scores for Easy, Normal, and Hard modes
- Saved each difficulty high score with a different LocalStorage key
- Loaded the correct high score when difficulty changes
- Updated the high score display to show the selected difficulty
- Added a Reset High Score button
- Reset only the high score for the currently selected difficulty

## Ninth Commit Progress

The ninth commit focused on adding landmark categories.

## Ninth Commit Built

- Added category selection
- Added All landmarks, World Wonders,, USA, and India categories
- Added category values to each landmark
- Added more landmarks to support category gameplay
- Filtered the round list based on the selected category
- Updated round count based on the selected category
- Saved high scores separatley by difficulty and category
- Locked category changes during active gameplay
- Re-enabled category selection after restart or game over

## Tenth Commit Progress

The tenth commit focused on improving replayability and game polish.

## Tenth Commit Built

- Added randomized landmark order
- Shuffled the selected category at the start of each game
- Shuffled landmarks again when Restart Game is clicked
- Kept category filtereing working with randomized order
- Added a mode summary showing the current difficulty and category
- Improved the overall game flow and replay value


## Eleventh Commit Progress

The eleventh commit focused on adding a proper start screen and fixing the game start flow.

## Eleventh Commit Built

- Added a start screen before active gameplay begins
- Added Start Game functionality
- Prevented users from guessing before the game starts
- Added a clean game initialization flow
- Added the missing PrepareStartScreen() function
- Added the missing startGame() function
- Fixed the settings summary function typo
- Fixed the Start Game button hover selector in CSS
- Disabled hint, submit, and next round buttons before the game starts
- Locked difficulty and category settings during active gameplay
Improved the transition from setup mode into the first round

## Current Features

- Interactive world map
- Start screen
- Start Game button
- Click-to-guess gameplay
- Multiple landmark rounds
- Randomized landmark order
- Category-based landmark selection
- Dynamic round number
- Dynamic target landmark
- User guess marker
- Correct answer marker
- Visual line between the guess and correct location
- Distance-based feedback
- Score out of 1000 for each round
- Total score tracking
- Difficulty-specific and category-specific high scores
- Browser localStorage support
- Timed rounds
- Timeout handling
- Difficulty levels
- Current mode summary
- Hint system
- Hint score penalty
- Landmark facts
- Final game-over message
- Restart game option
- Reset high score option
- Basic responsive layout

## Tools Used

- HTML
- CSS
- JavaScript
- Leaflet.js
- OpenStreetMap
- localStorage
- setInterval
- clearInterval
- VS Code
- Git
- Github

## Future Improvements

- Add more landmarks
- Add more categories such as Europe, Asia, South America, and Monuments
- Add better marker colors for guess and answer
- Add mobile responsive improvements
- Add sound effects
- Add animations
- Add leaderboard-style score history
- Add a better final results screen
- Add score history for previous games