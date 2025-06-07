//OPENSTREETMAP API
import axios from "axios";

async function getCoordinates(place) {
    try{
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${place}&format=json&addressdetails=1`
          );
          const data = response.data[0];
          return {
            name: place,
            lat: parseFloat(data.lat),
            lon: parseFloat(data.lon),
          };
    }catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

// getCoordinates("").then((coordinates) => {
//     if (coordinates) {
//         console.log(`Coordinates of ${coordinates.name}:`);
//         console.log(`Latitude: ${coordinates.lat}`);
//         console.log(`Longitude: ${coordinates.lon}`);
//     } else {
//         console.log("Failed to fetch coordinates.");
//     }
// });

(async ()=> {
    const places = [
        "Kanishk Surgical & Super Specialty Hospital, Dehradun",
        "Shri Mahant Indiresh Hospital, Dehradun",
        "Medilife Superspeciality Hospital: Premier Multispeciality Hospital and Private Hospital, Dehradun",
        "Graphic Era Deemed to be University, Dehradun",
        "Graphic Era Hill University, Dehradun",
    ];

    for (const place of places) {
    const location = await getCoordinates(place);
    console.log(location);
    }
})();

/*
Output
Coordinates of Graphic Era Deemed to be University, Dehradun:
Latitude: 30.2680251
Longitude: 77.9961187

Coordinates of Graphic Era Hill Unive
rsity, Dehradun:
Latitude: 30.2727947
Longitude: 78.000611

*/