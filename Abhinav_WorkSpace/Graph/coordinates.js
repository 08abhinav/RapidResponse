// LocationIQ API to get coordinates of a place
import 'dotenv/config'; 
import fs from 'fs';
import axios from 'axios';

const LocationIQ_API_KEY = process.env.LocationIQ_API_KEY;
const delay = ms => new Promise(res => setTimeout(res, ms)); 

export async function getLocation(placeName) {
  try {
    const encodedPlace = encodeURIComponent(placeName);
    const url = `https://us1.locationiq.com/v1/search.php?key=${LocationIQ_API_KEY}&q=${encodedPlace}&format=json`;

    await delay(1000); 
    const response = await axios.get(url);
    await delay(1500); // Adding a delay to avoid hitting the API rate limit

    if (response.data && response.data.length > 0) {
      const place = response.data[0];
      return {
        name: place.display_name,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon),
        type: place.type
      };
    } else {
      console.warn(`No results found for "${placeName}"`);
      return null;
    }
  } catch (error) {
    console.error("LocationIQ API Error:", error.message);
    return null;
  }
}


(async () => {
    const places = [
      "Kanishk Surgical & Super Specialty Hospital, Dehradun",
      "Shri Mahant Indiresh Hospital, Dehradun",
      "Medilife Superspeciality Hospital: Premier Multispeciality Hospital and Private Hospital, Dehradun",
      "Graphic Era Deemed to be University, Dehradun",
      "Graphic Era Hill University, Dehradun",
    ];
  
    for (const place of places) {
      const location = await getLocation(place);
      console.log(location);
    }
})();
(async () => {
    const places = [
      "Kanishk Surgical & Super Specialty Hospital, Dehradun",
      "Shri Mahant Indiresh Hospital, Dehradun",
      "Medilife Superspeciality Hospital: Premier Multispeciality Hospital and Private Hospital, Dehradun",
      "R G Hospital, Dehradun",
      "Power Life care Hospital, Dehradun",
      "Max Super Speciality Hospital, Dehradun",
      "Kailash Hospital, Dehradun",
      "Vibhuti Super Speciality Hospital, Dehradun",
      "Graphic Era Hospital, Dehradun",
      "Central Hope Town",
      "Jhajra",
      "ISBT, Dehradun",
      "Shimla Bypass Chowk, Dehradun",
      "Shubash Nagar, Dehradun",
      "Transport Nagar, Dehradun",
      "Clock Tower, Dehradun",
      "Paltan Bazaar, Dehradun",
      "Dehradun Railway Station",
      "Patel Nagar, Dehradun",
      "Jakhan, Dehradun",
      "Pacific Mall, Dehradun",
      "Doon Business Park, Dehradun",
      "Saharanpur road, Dehradun",
      "Graphic Era Deemed to be University, Dehradun",
      "Graphic Era Hill University, Dehradun",
      "Uttaranchal University, Dehradun",
      "Nanda ki Chowki, Dehradun",
      "Tula's Institute, Dehradun",
      "Chakarta Road, Dehradun",
    ];
    
    const locations={}
    for (const place of places) {
      const location = await getLocation(place);
      locations[place] = location
      // console.log(location)
    }
    fs.writeFileSync('loc_Coords.json', JSON.stringify(locations, null, 2))
})();


/*
OutPut:
{Kanish surgical :{
  name: 'Kanishk Surgical and Super Spe
ciality Hospital, Dehradun, Dehradun, U
ttarakhand, 248001, India',
  lat: 30.291798,
  lon: 78.050898,
  type: undefined
}}
{
  name: 'Shri Mahant Indiresh Hospital,
 Saharanpur road, Dehradun, Uttarakhand
, 248001, India',
  lat: 30.304785,
  lon: 78.0209032,
  type: 'hospital'
}
{
  name: 'Botanica Private, Civic Hospit
al, Ottawa, Ottawa, Ontario, K1Y 4R2, C
anada',
  lat: 45.394849,
  lon: -75.715084,
  type: undefined
}
{
  name: 'Graphic Era (Deemed to be) Uni
versity, 566/6, Bell Road, Mohabbewāla,
 Dehradun, Uttarakhand, 248001, India',
  lat: 30.26802515,
  lon: 77.99611868208233,
  type: 'university'
}
{
  name: "Graphic Era Hill University, D
ehradun Campus, St. Mary's Church Road,
 Ogalwāla, Dehradun, Uttarakhand, 24800
1, India",
  lat: 30.27279465,
  lon: 78.0006110061085,
  type: 'university'
}

 */