const map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const guessIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const correctIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

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
    },
    {
        name: "Mount Rushmore, USA",
        lat: 43.8791,
        lng: -103.4591,
        category: "usa",
        hint: "This landmark has four U.S. presidents carved into a mountain.",
        fact: "Mount Rushmore features the faces of George Washington, Thomas Jefferson, Theodore Roosevelt, and Abraham Lincoln."
    },
    {
        name: "Golden Gate Bridge, USA",
        lat: 37.8199,
        lng: -122.4783,
        category: "usa",
        hint: "This famous orange bridge is in San Francisco",
        fact: "The Golden Gate Bridge opened in 1937 and is one of the most recognized bridges in the world."
    },
    {
        name: "White House, USA",
        lat: 38.8977,
        lng: -77.0365,
        category: "usa",
        hint: "This is the official residence of the President of the United States.",
        fact: "The White House has been the official home of every U.S. president since John Adams."
    },
    {
        name: "Disney World, USA",
        lat: 28.3852,
        lng: -81.5639,
        category: "usa",
        hint: "This major theme park resort is located in Florida.",
        fact: "Walt Disney World opened in 1971 and is one of the most visited vacation resorts in the world."
    },
    {
        name: "Gateway Arch, USA",
        lat: 38.6247,
        lng: -90.1848,
        category: "usa",
        hint: "This tall silver arch is in St. Louis, Missouri.",
        fact: "The Gateway Arch is 630 feet tall and represents westward expansion in the United States."
    },
    {
        name: "India Gate, India",
        lat: 28.619,
        lng: 77.2295,
        category: "india",
        hint: "This war memorial is located in New Delhi.",
        fact: "India Gate was buit to honor Indian soldiers who died during World War I."
    },
    {
        name: "Red Fort, India",
        lat: 28.6562,
        lng: 77.2410,
        category: "india",
        hint: "This red sandstone fort is in Old Delhi.",
        fact: "The Red Fort was built by Mughal emperor Shah Jahan and is a UNESCO World Heritage Site"
    },
    {
        name: "Hawa Mahal, India",
        lat: 26.9239,
        lng: 75.8267,
        category: "india",
        hint: "This pink palace with many windows is in Jaipur.",
        fact: "Hawa Mahal is known as the Palace of Winds and was built in 1799."
    },
    {
        name: "Charminar, India",
        lat: 17.3616,
        lng: 78.4747,
        category: "india",
        hint: "This four-minaret monument is in Hyderabad.",
        fact: "Charminar was built in 1591 and is one of the Hyderabad's most famous landmarks."
    },
    {
        name: "Mysore Palace, India",
        lat: 12.3052,
        lng: 76.6552,
        category: "india",
        hint: "This royal palace is in Karnataka",
        fact: "Mysore Palace is one of the most visited tourist attractions in India."
    },
    {
        name: "Colosseum, Italy",
        lat: 41.8902,
        lng: 12.4922,
        category: "world",
        hint: "This ancient amphitheater is in Rome.",
        fact: "The Colosseum was used for gladiator contests and public events in ancient Rome."
    },
    {
        name: "Christ the Redeemer, Brazil",
        lat: -22.9519,
        lng: -42.2105,
        category: "world",
        hint: "This large statue overlooks Rio de Janerio",
        fact: "Christ the Redeemer is one of the New Seven Wonders of the World."
    },
    {
        name: "Petra, Jordan",
        lat: 30.3285,
        lng: 35.4444,
        category: "world",
        hint: "This ancient city is famous for buildings carved into rose-colored rock.",
        fact: "Petra was once a major trading center and is now a UNESCO World Heritage Site."
    },
    {
        name: "Pyramids of Giza, Egypt",
        lat: 29.9792,
        lng: 31.1342,
        category: "world",
        hint: "These ancient pyramids are near Cairo.",
        fact: "The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World."
    },
    {
        name: "Sydney Opera House, Australia",
        lat: -33.8568,
        lng: 151.2153,
        category: "world",
        hint: "This building has a sail-like roof and is in Australia.",
        fact: "The Sydney OPera House opened in 1973 and is one of the most famous performing arts centers in the world."
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

let currentPlaces = getShuffledPlacesForCategory();
let highScore = loadHighScore();

let userMarker = null;
let correctMarker = null;
let resultLine = null;
let userGuess = null;
let roundSubmitted = false;
let hintUsed = false;
let gameStarted = false;

let timeLeft = timeLimit;
let timerInterval = null;

const roundTitle = document.getElementById("roundTitle");
const targetPlace = document.getElementById("targetPlace");
const scoreDisplay = document.getElementById("scoreDisplay");
const highScoreDisplay = document.getElementById("highScoreDisplay");
const difficultySelect = document.getElementById("difficultySelect");
const categorySelect = document.getElementById("categorySelect");
const settingsSummary = document.getElementById("settingsSummary");
const startMessage = document.getElementById("startMessage");
const timerDisplay = document.getElementById("timerDisplay");
const resultMessage = document.getElementById("resultMessage");
const startGameBtn = document.getElementById("startGameBtn");
const factMessage = document.getElementById("factMessage");
const hintBtn = document.getElementById("hintBtn");
const submitGuessBtn = document.getElementById("submitGuessBtn");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const restartGameBtn = document.getElementById("restartGameBtn");
const resetHighScoreBtn = document.getElementById("resetHighScoreBtn");

prepareStartScreen();

map.on("click", function (event) {
    if (gameStarted === false) {
        resultMessage.textContent = "Click Start Game before making a guess.";
        return;
    }

    if (roundSubmitted === true) {
        resultMessage.textContent = "You already submitted this round. Click Next Round to continue.";
        return;
    }

    userGuess = event.latlng;

    if (userMarker !== null) {
        map.removeLayer(userMarker);
    }

    userMarker = L.marker([userGuess.lat, userGuess.lng], {
        icon: guessIcon
    })
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
            weight: 3,
            dashArray: "8, 8"
        }
    ).addTo(map);

    correctMarker = L.marker([correctPlace.lat, correctPlace.lng], {
        icon: correctIcon
    })
        .addTo(map)
        .bindPopup(correctPlace.name)
        .openPopup();

        fitMapToResult(
            userGuess.lat,
            userGuess.lng,
            correctPlace.lat,
            correctPlace.lng
        );

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
    updateSettingsSummary();

    resultMessage.textContent = 
        `You were ${distanceKm.toFixed(1)} km away. Score: ${score} / 1000.`;

        if (hintUsed === true) {
            resultMessage.textContent += " Hint penalty: -100 points.";
        }

    factMessage.textContent = `Fact: ${correctPlace.fact}`;

    roundSubmitted = true;
    hintBtn.disabled = true;
    submitGuessBtn.disabled = true;
    nextRoundBtn.disabled = false;
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

    difficultySelect.disabled = true;
    categorySelect.disabled = true;
    
    roundTitle.textContent =  `Round ${currentRoundIndex + 1} of ${currentPlaces.length}`;
    targetPlace.textContent = currentPlace.name;
    updateScoreDisplay();
    updateSettingsSummary();
    resultMessage.textContent = "Make your guess by clicking on the map.";
    factMessage.textContent = "";

    userGuess = null;
    roundSubmitted = false;
    hintUsed = false;

    hintBtn.disabled = false;
    submitGuessBtn.disabled = false;
    nextRoundBtn.disabled = true;

    map.setView([20, 0], 2);
    
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

    currentPlaces = getShuffledPlacesForCategory();

    currentRoundIndex = 0;
    totalScore = 0;
    userGuess = null;
    roundSubmitted = false;
    hintUsed = false;
    difficultySelect.disabled = false;
    categorySelect.disabled = false;

    prepareStartScreen();
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

    correctMarker = L.marker([correctPlace.lat, correctPlace.lng], {
        icon: correctIcon
    })
        .addTo(map)
        .bindPopup(correctPlace.name)
        .openPopup();

    map.setView([correctPlace.lat, correctPlace.lng], 5);

        resultMessage.textContent = "Time is up. You scored 0 points for this round.";
        factMessage.textContent = `Fact: ${correctPlace.fact}`;

        roundSubmitted = true;
        hintBtn.disabled = true;
        submitGuessBtn.disabled = true;
        nextRoundBtn.disabled = false;
        difficultySelect.disabled = true;
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

difficultySelect.addEventListener("change", function() {
    selectedDifficulty = difficultySelect.value;
    timeLimit = difficultySettings[selectedDifficulty];
    highScore = loadHighScore();

    prepareStartScreen();
})

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
    currentPlaces = getShuffledPlacesForCategory();
    highScore = loadHighScore();

    prepareStartScreen();
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

function getShuffledPlacesForCategory() {
    const filteredPlaces = getPlacesForCategory();
    return shufflePlaces(filteredPlaces);
}

function shufflePlaces(placesToShuffle) {
    const shuffledPlaces = [...placesToShuffle];

    for (let i = shuffledPlaces.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        const temporaryPlace = shuffledPlaces[i];
        shuffledPlaces[i] = shuffledPlaces[randomIndex];
        shuffledPlaces[randomIndex] = temporaryPlace;
    }

    return shuffledPlaces;
}

function updateSettingsSummary() {
    settingsSummary.textContent = 
        `Mode: ${capitalizeFirstLetter(selectedDifficulty)} / ${getCategoryName()}`;
}

startGameBtn.addEventListener("click", function() {
    startGame();
});

function prepareStartScreen() {
    gameStarted = false;
    stopTimer();
    resetMapMarkers();

    currentPlaces = getShuffledPlacesForCategory();
    currentRoundIndex = 0;
    totalScore = 0;
    userGuess = null;
    roundSubmitted = false;
    hintUsed = false;

    highScore = loadHighScore();

    roundTitle.textContent = "Ready to Play";
    targetPlace.textContent = "Game not started yet";
    timerDisplay.textContent = `Time Left: ${timeLimit}s`;
    resultMessage.textContent = "Choose your settings, then click Start Game.";
    factMessage.textContent = "";
    startMessage.textContent = "Choose your settings, then click Start Game.";
    
    difficultySelect.disabled = false;
    categorySelect.disabled = false;

    startGameBtn.disabled = false;
    hintBtn.disabled = true;
    submitGuessBtn.disabled = true;
    nextRoundBtn.disabled = true;
    restartGameBtn.disabled = false;
    resetHighScoreBtn.disabled = false;

    document.querySelector(".start-box").style.display = "block";

    updateScoreDisplay();
    updateSettingsSummary();
}

function startGame() {
    gameStarted = true;

    currentPlaces = getShuffledPlacesForCategory();
    currentRoundIndex = 0;
    totalScore = 0;
    userGuess = null;
    roundSubmitted = false;
    hintUsed = false;

    difficultySelect.disabled = true;
    categorySelect.disabled = true;
    startGameBtn.disabled = true;

    document.querySelector(".start-box").style.display = "none";

    displayCurrentRound();
}

function fitMapToResult(userLat, userLng, correctLat, correctLng) {
    const resultBounds = L.latLngBounds([
        [userLat, userLng],
        [correctLat, correctLng]
    ]);

    map.fitBounds(resultBounds, {
        padding: [60, 60],
        maxZoom: 6
    });
}

