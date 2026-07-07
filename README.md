# Landmark Locator

Landmark Locator is an interactive map-based travel game where users guess the location of famous landmarks by clicking on a world map.

## Project Description

This project uses an interactive map to challenge users to find famous landmarks. The player clicks on the map to make a guess, submits the guess, and then sees the correct location. The game calculates the distance between the player's guess and the real landmark location, then gives a score based on accuracy.

## First Hour Progress

The first hour focused on setting up the project structure and building the basic interactive map.

## First Hour Built

- Created the main project files
- Added HTML structure
- Added CSS styling
- Connected Leaflet.js
- Displayed an interactive OpenStreetMap map
- Added click-to-place marker functionality
- Added a submit button
- Added the first sample landmark: Eiffel Tower, France

## Second Hour Progress

The second hour focused on adding the main game logic.

## Second Hour Built

- Added user guess marker
- Added correct answer marker
- Added a line between the guess and the correct location
- Added distance calculation using latitude and longitude
- Added score calculation
- Added result message showing distance and score
- Prevented users from changing their guess after submitting
- Turned th emap from a basic demo into a playable first version


## Third Hour Progress

The third hour focused on expanding the game from one round into a multi-round experience.

## Third Hour Built

- Added multiple landmarks
- Added current round tracking
- Added total score tracking
- Made the Next Round button work
- Updated the target landmark dynamically
- Updated the round title dynamically
- Cleared old markers and lines between rounds
- Added a game-over state
- Displayed the final score after all landmarks are completed

## Current Features

- Interactive world map
- Click-to-guess gameplay
- Multiple landmark rounds
- Dynamic round number
- Dynamic target landmark
- User guess marker
- Correct answer marker
- Visual line between the guess and correct location
- Distance-based feedback
- Score out of 1000 for each round
- Total score tracking
- Final game-over message

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
- Add hint button
- Add timer for each round
- Add restart game button
- Add high score using localStorage
- Add better marker colors for guess and answer
- Add mobile responsive improvements
- Add facts about each landmark after each guess