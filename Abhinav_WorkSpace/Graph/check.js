import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';

// API KEYS
const LocationIQ_API_KEY = process.env.LocationIQ_API_KEY;
const API_KEY = process.env.API_KEY;

// Delay between API calls to avoid rate-limiting (1000ms = 1 sec)
const delay = ms => new Promise(res => setTimeout(res, ms));

// ---------- LOCATIONIQ FUNCTION ----------
async function getLocation(placeName) {
  try {
    const encodedPlace = encodeURIComponent(placeName);
    const url = `https://us1.locationiq.com/v1/search.php?key=${LocationIQ_API_KEY}&q=${encodedPlace}&format=json`;
    const response = await axios.get(url);
    await delay(1000); // Respect rate limits

    if (response.data && response.data.length > 0) {
      const place = response.data[0];
      return {
        name: place.display_name || place.name || placeName,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon),
        type: place.type || "unknown"
      };
    } else {
      console.warn(`No results for: ${placeName}`);
      return null;
    }
  } catch (error) {
    console.error("LocationIQ API Error:", error.response?.data || error.message);
    return null;
  }
}

// ---------- ORS FUNCTION ----------
async function getRoute(from, to) {
  if (!from || !to || !from.lat || !to.lat) return null;

  try {
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car',
      {
        coordinates: [
          [from.lon, from.lat],
          [to.lon, to.lat],
        ]
      },
      {
        headers: {
          'Authorization': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    await delay(1000); // Delay to avoid rate-limiting
    const data = response.data;
    return {
      from: from.name,
      to: to.name,
      distance: data.routes[0].summary.distance, // meters
      duration: data.routes[0].summary.duration, // seconds
      intersection: data.routes[0].segments[0].steps
    };
  } catch (error) {
    console.error("ORS Error:", error.response?.data || error.message);
    return null;
  }
}

// ---------- MAIN ----------
(async () => {
  const placeNames = [
    "Kanishk Surgical & Super Specialty Hospital, Dehradun",
    "Shri Mahant Indiresh Hospital, Dehradun",
    "Medilife Superspeciality Hospital, Dehradun",
    "Graphic Era Deemed to be University, Dehradun",
    "Graphic Era Hill University, Dehradun"
  ];

  // STEP 1: Get or Load Locations
  let locations = [];

  if (fs.existsSync('locations.json')) {
    locations = JSON.parse(fs.readFileSync('locations.json', 'utf-8'));
    console.log("📂 Loaded cached coordinates from locations.json");
  } else {
    for (const name of placeNames) {
      const loc = await getLocation(name);
      if (loc) locations.push(loc);
    }
    fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
    console.log("✅ Coordinates fetched and saved.");
  }

  // STEP 2: Pairwise Distance Calculation
  for (let i = 0; i < locations.length; i++) {
    for (let j = i + 1; j < locations.length; j++) {
      const from = locations[i];
      const to = locations[j];

      const route = await getRoute(from, to);
      if (route) {
        console.log(`From: ${route.from} → To: ${route.to}`);
        console.log(`Distance: ${(route.distance / 1000).toFixed(2)} km`);
        console.log(`Duration: ${(route.duration / 60).toFixed(2)} min`);
        console.log(`Intersections: ${route.intersection.length}`);
        console.log('-------------------------');
      }
    }
  }
})();
