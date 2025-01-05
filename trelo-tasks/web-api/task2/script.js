const locationElement = document.getElementById("location");
const locationMarker = document.getElementById("location-marker");
const audioElement = document.getElementById("audio");
const statusElement = document.getElementById("status");
const mapElement = document.getElementById("map");

let scale = 500;
let audioTracks = {
  "ukraine": "audio/track1.mp3",
  "other": "audio/track2.mp3"
};

let map, marker;

function initMap() {
  map = L.map('map').setView([48.3794, 31.1656], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  marker = L.marker([48.3794, 31.1656]).addTo(map);
}

function updateLocationMarker(lat, lon) {
  locationElement.textContent = `${lat.toFixed(5)}, ${lon.toFixed(5)}`;

  marker.setLatLng([lat, lon]);
  map.setView([lat, lon], 13);
}

function loadAudio(lat, lon) {
  let trackKey = isInUkraine(lat, lon) ? "ukraine" : "other";
  let trackUrl = audioTracks[trackKey];

  if (trackUrl) {
    audioElement.src = trackUrl;
    audioElement.volume = 0.2;
    audioElement.play();
    statusElement.textContent = `Playing: ${trackKey === "ukraine" ? "Track 1 (Ukraine)" : "Track 2 (Other countries)"}`;
  } else {
    statusElement.textContent = "No audio for this location";
  }
}

function isInUkraine(lat, lon) {
  return lat >= 44.0 && lat <= 52.0 && lon >= 22.0 && lon <= 40.0;
}

navigator.geolocation.watchPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    updateLocationMarker(latitude, longitude);
    loadAudio(latitude, longitude);
  },
  (error) => {
    locationElement.textContent = "Location access denied or unavailable.";
    console.error("Error getting location:", error);
  },
  { enableHighAccuracy: true }
);

window.onload = initMap;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then((registration) => {
    console.log('Service Worker registered with scope:', registration.scope);
  }).catch((error) => {
    console.error('Service Worker registration failed:', error);
  });
}
