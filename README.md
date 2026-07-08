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

the Fifth hour focused on saving player progress and improving score feedback.

## Fifth Commit Built

- Added high score display
- Added persistent high score saving with localStorage
- Loaded the saved high score when the page opens
- Compared final score against the saved high score
- Displayed a New high score message when the player beats the record
- Improved the score area layout
- Updated round text to show progress, such as Round 1 of 5

## Current Features
- Interactive world map
- Click-to-guess gameplay
- Multiple landmark rounds
- Dynamic round number
- Dynamic target landmark
- User guess marker
- Correct answer marker
- Visual line between guess and correct location
- Distance-based feedback
- Score out of 1000 for each round
- Total score tracking
- High score saving
- Browser localStorage support
- Hint system
- Hint score penalty
- Landmark facts
- Final game-over messsage
- Restart game option

## Tools Used

- HTML
- CSS
- JavaScript
- Leaflet.js
- OpenStreetMap
- VS Code
- Git
- Github

## Future Improvements

- Add more landmarks
- Add difficulty levels
- Add timer for each round
- Add high score reset button
- Add better marker colors for guess and answer
- Add mobile responsive improvements
- Add categories such as World, USA, India, and Wonders
- Add sound effects
- Add animations