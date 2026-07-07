const map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const places = [
    {
    name: "Eiffel Tower, France",
    lat: 48.8584,
    lng: 2.2945,
    hint: "This landmark is in Paris and is made of iron.",
    fact: "The Eiffel Tower was completed in 1889 and is one of the most visited landmarks in the world."
    },
    {
        name: "Taj Mahal, India",
        lat: 27.1751,
        lng: 78.0421
    },
    {
        name: "Statue of Liberty, USA",
        lat: 40.6892,
        lng: -74.0445
    },
    {
        name: "Great Wall of China",
        lat: 40.4319,
        lng: 116.5704
    },
    {
        name: "Machu Picchu, Peru",
        lat: -13.1631,
        lng: -72.5450
    }
];

let currentRoundIndex = 0;
let totalScore = 0;
let userMarker = null;
let correctMarker = null;
let resultLine = null;
let userGuess = null;
let roundSubmitted = false;
let hintUsed = false;

const roundTitle = document.getElementById("roundTitle");
const targetPlace = document.getElementById("targetPlace");
const scoreDisplay = document.getElementById("scoreDisplay");
const resultMessage = document.getElementById("resultMessage");
const factMessage = document.getElementById("factMessage");
const hintBtn = document.getElementById("hintBtn");
const submitGuessBtn = document.getElementById("submitGuessBtn");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const restartGameBtn = document.getElementById("restartGameBtn");

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

    const correctPlace = places[currentRoundIndex];

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

    totalScore = totalScore + score;
    scoreDisplay.textContent =  `Total Score: ${totalScore}`;

    resultMessage.textContent = 
    `You were ${distanceKm.toFixed(1)} km away. Score: ${score} / 1000.`;

    roundSubmitted = true;
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

    if (currentRoundIndex >= places.length) {
        endGame();
        return;
    }

    resetMapMarkers();
    displayCurrentRound();
});

function displayCurrentRound() {
    const currentPlace = places[currentRoundIndex];

    roundTitle.textContent = `Round ${currentRoundIndex + 1}`;
    targetPlace.textContent = currentPlace.name;
    scoreDisplay.textContent = `Total Score: ${totalScore}`;
    resultMessage.textContent = "Make your guess by clicking on the map.";
    factMessage.textContent = "";

    userGuess = null;
    roundSubmitted = false;
    hintUsed = false;

    hintBtn.disabled = false;
    submitGuessBtn.disabled = false;
    nextRoundBtn.disabled = false;
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
    resetMapMarkers();
    roundTitle.textContent = "Game Over";
    targetPlace.textContent = "All landmarks completed.";
    resultMessage.textContent = 
    `Final Score: ${totalScore} / ${places.length * 1000}`;
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

    const currentPlace = places[currentRoundIndex];

    resultMessage.textContent = `Hint: ${currentPlace.hint}`;
    hintUsed = true;
    hintBtn.disabled = true;
});

if (hintUsed === true) {
    score = Math.max(0, score - 100);
}

if (hintUsed === true) {
    resultMessage.textContent += " Hint penalty: -100 points.";
}

factMessage.textContent = `Facts: ${correctPlace.fact}`;

hintBtn.disabled = true;

restartGameBtn.addEventListener("click", function () {
    restartGameBtn();
});

function restartGame() {
    resetMapMarkers();

    currentRoundIndex = 0;
    totalScore = 0;
    userGuess = null;
    roundSubmitted = false;
    hintUsed = false;

    displayCurrentRound();
}