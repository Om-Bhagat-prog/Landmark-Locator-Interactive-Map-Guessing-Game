const map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const places = [
    {
        name: "Eiffel Tower, France",
        lat: 48.8584,
        lng: 2.2945
    }
];

let userMarker = null;
let userGuess = null;

const resultMessage = document.getElementById("resultMessage");
const submitGuessBtn = document.getElementById("submitGuessBtn");

map.on("click", function (event) {
    userGuess = event.latlng;

    if (userMarker !== null) {
        map.removeLayer(userMarker);
    }

    userMarker = L.marker([userGuess.lat, userGuess.lng]).addTo(map);
    resultMessage.textContent = "Guess selected. Click Submit Guess to check.";
});

submitGuessBtn.addEventListener("click", function () {
    if (userGuess === null) {
        resultMessage.textContent = "Please click somewhere on the map first.";
        return;
    }

    const correctPlace = places[0];

    L.marker([correctPlace.lat, correctPlace.lng])
        .addTo(map)
        .bindPopup(correctPlace.name)
        .openPopup();

        resultMessage.textContent = "Correct location shown on the map.";
});