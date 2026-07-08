const map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const allPlaces = [
    {
    name: "Eiffel Tower, France",
    lat: 48.8584,
    lng: 2.2945,
    category: "world",
    hint: "This landmark is in Paris and is made of iron.",
    fact: "The Eiffel Tower was completed in 1889 and is one of the most visited landmarks in the world."
    },
    {
        name: "Taj Mahal, India",
        lat: 27.1751,
        lng: 78.0421,
        category: "india",
        hint: "This white marble monument is in Agra, India.",
        fact: "The Taj Mahal was built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal."
    },
    {
        name: "Statue of Liberty, USA",
        lat: 40.6892,
        lng: -74.0445,
        category: "usa",
        hint: "This landmark stands on an island near New York City.",
        fact: "The Statue of Liberty was a gift from France to the United States."
    },
    {
        name: "Great Wall of China",
        lat: 40.4319,
        lng: 116.5704,
        category: "world",
        hint: "This historic wall stretches across northern China.",
        fact: "The Great Wall of China was built over many centuries to protect Chinese states and empires."
    },
    {
        name: "Machu Picchu, Peru",
        lat: -13.1631,
        lng: -72.5450,
        category: "world",
        hint: "This ancient site is located high in the Andes Mountains.",
        fact: "Machu Picchu is an Inca citadel in Peru and one of the most famous archaeological sites in the world."
    }
];

const difficultySettings = {
    easy: 45,
    normal: 30,
    hard: 15
};

let currentRoundIndex = 0;
let totalScore = 0;
let selectedDifficulty = "normal";
let selectedCategory = "all";
let timeLimit = difficultySettings[selectedDifficulty];

let currentPlaces = getPlacesForCategory();
let highScore = loadHighScore();

let userMarker = null;
let correctMarker = null;
let resultLine = null;
let userGuess = null;
let roundSubmitted = false;
let hintUsed = false;

let timeLeft = timeLimit;
let timerInterval = null;

const roundTitle = document.getElementById("roundTitle");
const targetPlace = document.getElementById("targetPlace");
const scoreDisplay = document.getElementById("scoreDisplay");
const highScoreDisplay = document.getElementById("highScoreDisplay");
const difficultySelect = document.getElementById("difficultySelect");
const categorySelect = document.getElementById("categorySelect");
const timerDisplay = document.getElementById("timerDisplay");
const resultMessage = document.getElementById("resultMessage");
const factMessage = document.getElementById("factMessage");
const hintBtn = document.getElementById("hintBtn");
const submitGuessBtn = document.getElementById("submitGuessBtn");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const restartGameBtn = document.getElementById("restartGameBtn");
const resetHighScoreBtn = document.getElementById("resetHighScoreBtn");

displayCurrentRound();

map.on("click", function (event) {
    if (roundSubmitted ===  true) {
        resultMessage.textContent = "You already submitted this round. Click Next Round to continue.";
        return;
    }

    userGuess = event.latlng;

    if(userMarker !== null) {
        map.removeLayer(userMarker);
    }

    userMarker = L.marker([userGuess.lat, userGuess.lng])
    .addTo(map)
    .bindPopup("Your Guess");

    resultMessage.textContent = "Guess selected. Click Submit Guess to check.";
});

submitGuessBtn.addEventListener("click", function() {
    if(userGuess === null) {
        resultMessage.textContent = "Please click somewhere on the map first.";
        return;
    }

    if(roundSubmitted === true) {
        resultMessage.textContent = "This round has already been submitted.";
        return;
    }

    stopTimer();

    const correctPlace = currentPlaces[currentRoundIndex];

    resultLine = L.polyline(
        [
            [userGuess.lat, userGuess.lng],
            [correctPlace.lat, correctPlace.lng]
        ],
        {
            weight: 3
        }
    ).addTo(map);

    correctMarker = L.marker([correctPlace.lat, correctPlace.lng])
    .addTo(map)
    .bindPopup(correctPlace.name)
    .openPopup();

    const distanceKm = calculateDistanceKm(
        userGuess.lat,
        userGuess.lng,
        correctPlace.lat,
        correctPlace.lng
    );

    let score = calculateScore(distanceKm);

    if (hintUsed === true) {
        score = Math.max(0, score - 100);
    }
    
    totalScore = totalScore + score;
    updateScoreDisplay();

    resultMessage.textContent = 
        `You were ${distanceKm.toFixed(1)} km away. Score: ${score} / 1000.`;

        if (hintUsed === true) {
            resultMessage.textContent += " Hint penalty: -100 points.";
        }

    factMessage.textContent = `Fact: ${correctPlace.fact}`;

    roundSubmitted = true;
    hintBtn.disabled = true;
    submitGuessBtn.disabled = true;
    difficultySelect.disabled = true;
    categorySelect.disabled = true;
});

function calculateDistanceKm(lat1, lng1, lat2, lng2) {
    const earthRadiusKm = 6371;

    const latDifference = toRadians(lat2 - lat1);
    const lngDifference = toRadians(lng2 - lng1);

    const startLat = toRadians(lat1);
    const endLat = toRadians(lat2);

    const a = 
        Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
        Math.cos(startLat) *
        Math.cos(endLat) *
        Math.sin(lngDifference / 2) *
        Math.sin(lngDifference / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadiusKm * c;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function calculateScore(distanceKm) {
    const score = Math.max(0, 1000 - Math.round(distanceKm));
    return score;
}

nextRoundBtn.addEventListener("click", function() {
    if (roundSubmitted === false) {
        resultMessage.textContent = "Submit your guess before going to the next round.";
        return;
    }

    currentRoundIndex = currentRoundIndex + 1;

    if (currentRoundIndex >= currentPlaces.length) {
        endGame();
        return;
    }

    resetMapMarkers();
    displayCurrentRound();
});

function displayCurrentRound() {
    const currentPlace = currentPlaces[currentRoundIndex];

    difficultySelect.disabled = currentRoundIndex > 0;
    roundTitle.textContent =  `Round ${currentRoundIndex + 1} of ${currentPlaces.length}`;
    targetPlace.textContent = currentPlace.name;
    updateScoreDisplay();
    resultMessage.textContent = "Make your guess by clicking on the map.";
    factMessage.textContent = "";

    userGuess = null;
    roundSubmitted = false;
    hintUsed = false;

    hintBtn.disabled = false;
    submitGuessBtn.disabled = false;
    nextRoundBtn.disabled = false;
    startTimer();
}

function resetMapMarkers() {
    if (userMarker !== null) {
        map.removeLayer(userMarker);
        userMarker = null;
    }

    if (correctMarker !== null) {
        map.removeLayer(correctMarker);
        correctMarker = null;
    }

    if (resultLine !== null) {
        map.removeLayer(resultLine);
        resultLine = null;
    }
}

function endGame() {
    stopTimer();
    resetMapMarkers();
    timerDisplay.textContent = "Time Left: 0s";
    roundTitle.textContent = "Game Over";
    targetPlace.textContent = "All landmarks completed.";
    const isNewHighScore = updateHighScore();
    updateScoreDisplay();
    difficultySelect.disabled = false;
    categorySelect.disabled = false;

    resultMessage.textContent = 
        `Final Score: ${totalScore} / ${currentPlaces.length * 1000}.`;

        if (isNewHighScore === true) {
            resultMessage.textContent += " New high score!";
        }

    factMessage.textContent = "Click Restart Game to play again.";

    hintBtn.disabled = true;
    submitGuessBtn.disabled = true;
    nextRoundBtn.disabled = true;
}

hintBtn.addEventListener("click", function () {
    if (roundSubmitted === true) {
        resultMessage.textContent = "This round is already submitted. Move to the next round.";
        return;
    }

    const currentPlace = currentPlaces[currentRoundIndex];

    resultMessage.textContent = `Hint: ${currentPlace.hint}`;
    hintUsed = true;
    hintBtn.disabled = true;
});

restartGameBtn.addEventListener("click", function () {
    restartGame();
});

function restartGame() {
    stopTimer();
    resetMapMarkers();

    currentPlaces = getPlacesForCategory();

    currentRoundIndex = 0;
    totalScore = 0;
    userGuess = null;
    roundSubmitted = false;
    hintUsed = false;
    difficultySelect.disabled = false;
    categorySelect.disabled = false;

    displayCurrentRound();
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Total Score: ${totalScore}`;
    highScoreDisplay.textContent = 
        `High Score (${capitalizeFirstLetter(selectedDifficulty)} / ${getCategoryName()}): ${highScore}`;
}

function updateHighScore() {
    if (totalScore > highScore) {
        highScore = totalScore;
        localStorage.setItem(getHighScoreKey(), highScore);
        return true;
    }

    return false;
}

function handleTimeUp() {
    if (roundSubmitted === true) {
        return;
    }

    const correctPlace = currentPlaces[currentRoundIndex];

    correctMarker = L.marker([correctPlace.lat, correctPlace.lng])
        .addTo(map)
        .bindPopup(correctPlace.name)
        .openPopup();

    resultMessage.textContent = "Time is up. You scored 0 points for this round.";
    factMessage.textContent = `Fact: ${correctPlace.fact}`;

    roundSubmitted = true;
    hintBtn.disabled = true;
    submitGuessBtn.disabled = true;
    categorySelect.disabled = true;
}

function startTimer() {
    stopTimer();

    timeLeft = timeLimit;
    updateTimerDisplay();

    timerInterval = setInterval(function () {
        timeLeft = timeLeft - 1;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            stopTimer();
            handleTimeUp();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
}

difficultySelect.addEventListener("change", function () {
    selectedDifficulty = difficultySelect.value;
    timeLimit = difficultySettings[selectedDifficulty];
    highScore = loadHighScore();

    restartGame();
});

resetHighScoreBtn.addEventListener("click", function () {
    resetHighScore();
});

function getHighScoreKey() {
    return `landmarkLocatorHighScore_${selectedDifficulty}_${selectedCategory}`;
}

function loadHighScore() {
    return Number(localStorage.getItem(getHighScoreKey())) || 0;
}

function resetHighScore() {
    localStorage.removeItem(getHighScoreKey());
    highScore = 0;
    updateScoreDisplay();

    resultMessage.textContent = 
        `${capitalizeFirstLetter(selectedDifficulty)} / ${getCategoryName()} high score has been reset.`;
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

categorySelect.addEventListener("change", function () {
    selectedCategory = categorySelect.value;
    currentPlaces = getPlacesForCategory();
    highScore = loadHighScore();

    restartGame();
});

function getPlacesForCategory() {
    if (selectedCategory === "all") {
        return allPlaces;
    }

    return allPlaces.filter(function (place) {
        return place.category === selectedCategory;
    });
}
function getCategoryName() {
    if (selectedCategory === "all") {
        return "All Landmarks";
    }

    if (selectedCategory === "world") {
        return "World Wonders";
    }

    if (selectedCategory === "usa") {
        return "USA";
    }

    if (selectedCategory === "india") {
        return "India"
    }

    return "Unknown";
}