// OpenRouteService API to get distance and duration between two coordinates
import 'dotenv/config'; 
import axios from "axios";
import { getLocation } from "./coordinates.js"; // Assuming this is the correct path to your coordinates.js file

const delay = ms => new Promise(res => setTimeout(res, ms));
async function getRoute(from, to) {
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
          'Authorization': process.env.API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    await delay(1000); // Adding a delay to avoid hitting the API rate limit
    const data = response.data;
    const distance = data.routes[0].summary.distance;  // Distance in meters
    const duration = data.routes[0].summary.duration;  // Duration in seconds
    const intersection = data.routes[0].segments[0].steps;  // List of steps/intersections

    return {
      distance,
      duration,
      intersection
    };
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
}

const data = await getRoute({ lat: 30.291798, lon: 78.050898},{lat: 30.304785, lon: 78.0209032})
console.log(data.duration, data.distance, data.intersection.length);

// (async () => {
//   const places = [
//     "Kanishk Surgical & Super Specialty Hospital, Dehradun",
//     "Shri Mahant Indiresh Hospital, Dehradun",
//     "Medilife Superspeciality Hospital: Premier Multispeciality Hospital and Private Hospital, Dehradun",
//     "Graphic Era Deemed to be University, Dehradun",
//     "Graphic Era Hill University, Dehradun",
//   ];

//   //Calcuting the lat and lon of each place
//   const locations = []
//   for (const place of places) {
//     const loc = await getLocation(place);
//     if(loc){
//       locations.push(loc);
//     }
//   }

//   console.log("Locations:", locations);

//   //Calculating the distance and duration between each pair of places
//   for(let i=0; i<locations.length; i++){
//     for(let j=i+1; j<locations.length; j++){
//       const from = locations[i];
//       const to = locations[j];
//       const route = await getRoute(from, to);
//       if (route) {
//         // If the route is successfully fetched, log the information
  
//         console.log(`From: ${route.from} → To: ${route.to}`); // Display the pair of places
//         console.log(`Distance: ${(route.distance / 1000).toFixed(2)} km`); // Convert meters to kilometers and round to 2 decimal places
//         console.log(`Duration: ${(route.duration / 60).toFixed(2)} min`);  // Convert seconds to minutes and round to 2 decimal places
//         console.log(`Intersections: ${route.intersection.length}`); // Count the number of navigation steps (could be treated as intersections or turns)
//         console.log('-------------------------'); // Print a separator for clarity
//       }    
//     }
//   }
// })();

// const from = { lat: 30.2680251, lon: 77.9961187 };
// const to = { lat: 30.2727947, lon: 78.000611 }; 

// getRoute(from, to)
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err));


/*{
distance: 1132.3,
duration: 230.7,
intersection: [
{
    distance: 174.6,
    duration: 43.8,
    type: 11,
    instruction: 'Head northeast',   
    name: '-',
    way_points: [Array]
},
{
    distance: 100.1,
    duration: 24,
    type: 0,
    instruction: 'Turn left',        
    name: '-',
    way_points: [Array]
},
{
    distance: 39.2,
    duration: 9.4,
    type: 1,
    instruction: 'Turn right',       
    name: '-',
    way_points: [Array]
},
{
    distance: 96.4,
    duration: 23.1,
    type: 0,
    instruction: 'Turn left onto Post
Office Road',
    name: 'Post Office Road',        
    way_points: [Array]
},
{
    distance: 302.6,
    duration: 36.3,
    type: 1,
    instruction: 'Turn right',       
    name: '-',
    way_points: [Array]
},
{
    distance: 98,
    duration: 23.5,
    type: 0,
    instruction: 'Turn left',        
    name: '-',
    way_points: [Array]
},
{
    distance: 132.3,
    duration: 33.3,
    type: 1,
    instruction: 'Turn right',       
    name: '-',
    way_points: [Array]
},
{
    distance: 101,
    duration: 20,
    type: 1,
    instruction: 'Turn right',       
    name: '-',
    way_points: [Array]
},
{
    distance: 8,
    duration: 2.9,
    type: 0,
    instruction: 'Turn left',        
    name: '-',
    way_points: [Array]
},
{
    distance: 80.1,
    duration: 14.4,
    type: 1,
    instruction: 'Turn right',       
    name: '-',
    way_points: [Array]
},
{
    distance: 0,
    duration: 0,
    type: 10,
    instruction: 'Arrive at your dest
ination, on the left',
    name: '-',
    way_points: [Array]
}
]
} */
