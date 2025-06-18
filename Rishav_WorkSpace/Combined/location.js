// var greenIcon = new L.Icon({
// iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
// shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// iconSize: [25, 41],
// iconAnchor: [12, 41],
// popupAnchor: [1, -34],
// shadowSize: [41, 41]
// });
// var Icon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
// shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// iconSize: [25, 41],
// iconAnchor: [12, 41],
// popupAnchor: [1, -34],
// shadowSize: [41, 41]
// });
// var redIcon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
// shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// iconSize: [25, 41],
// iconAnchor: [12, 41],
// popupAnchor: [1, -34],
// shadowSize: [41, 41]
// });


const allLocations = [
  { lat: 30.267952, lng: 77.996065, name: '<h2>Graphic Era Deemed to be University</h2>'},
  { lat: 30.272775, lng: 78.000385, name: '<h3>Graphic Era Hill University</h3>'},
  { lat: 30.2893203, lng: 77.9971436, name: '<h3>ISBT Dehradun</h3>'},
  { lat: 30.268651, lng: 78.078728, name: '<h3>Ghavle Hospital</h3>'},
  {lat: 30.304785, lng: 78.0209032, name: '<h3>Shri Mahant Indiresh Hospital, Dehradun</h3>'},
  { lat: 30.3165, lng: 78.0322, name: '<h3>Dehradun Railway Station</h3>'},
  {lat: 30.373654, lng:78.074597, name: '<h3>Max Super Speciality Hospital, Dehradun</h3>'},
  {lat: 30.350057, lng: 77.8915375, name: '<h3>Graphic Era Institute of Medical Sciences</h3>'},
  {lat: 30.291798, lng: 78.050898, name: '<h3>Kanishk Surgical & Super Specialty Hospital, Dehradun</h3>'},
  { lat: 30.307106, lng: 77.983251, name: '<h3>Vibhuti Super Speciality Hospital, Dehradun</h3>'},
  {lat: 30.320409, lng: 78.046934, name: '<h3>R G Hospital, Dehradun</h3>'},
  { lat: 30.338277, lng: 78.020613, name: '<h3>Power Life care Hospital, Dehradun</h3>'},
];//This array contains all the locations with their latitude, longitude and name.

const map = L.map('map').setView([30.267952,77.996065], 12);//setView is used to set the initial view of the map

var mapview=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: ' OpenStreetMap'
});
let currentLayer=mapview.addTo(map);

var satelliteLayer = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=3AR8OIx4QoheVNr5cdYv',
{attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'});

// Add all markers
const markers = allLocations.map(loc => { L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.name);});
            
document.getElementById('markerSelect_1').addEventListener('change', function () {
  const index = this.value;
  if (index !== "") {
    const marker = markers[index];
    const { lat, lng } = allLocations[index];
    map.setView([lat, lng], 18); // Zoom to marker
    marker.openPopup();          // Open the marker's popup
  }
});
document.getElementById('markerSelect_2').addEventListener('change', function () {
  const index = this.value;
  if (index !== "") {
    const marker = markers[index];
    const { lat, lng } = allLocations[index];
    map.setView([lat, lng], 18); // Zoom to marker
    marker.openPopup();          // Open the marker's popup
  }
});

let currentLine;//currentLine is used to store the current polyline
let distanceLabel;//distanceLabel is used to store the distance label

function connectRoute() {
  // Remove old line and label
  if (currentLine) 
  map.removeLayer(currentLine);
  if (distanceLabel) 
  map.removeLayer(distanceLabel);

  // const sourceInput = document.getElementById('markerSelect_1').value;
  // const destInput = document.getElementById('markerSelect_2').value;
  // const source = allLocations.find(loc => loc.name.toLowerCase() === sourceInput);
  // const destination = allLocations.find(loc => loc.name.toLowerCase() === destInput);

  const sourceIndex = parseInt(document.getElementById('markerSelect_1').value, 10);
  const destIndex = parseInt(document.getElementById('markerSelect_2').value, 10);
  
  const source = allLocations[sourceIndex];
  const destination = allLocations[destIndex];

  if (!source || !destination) {
    alert('Invalid source or destination.');
    return;
  }

  const route = [
    [source.lat, source.lng],
    [destination.lat, destination.lng]
  ];

  // Draw polyline
  currentLine = L.polyline(route, { color: 'blue', weight: 5 }).addTo(map);
  map.fitBounds(currentLine.getBounds());// Fit map to the polyline bounds

  // Calculate distance in km
  const distance = L.latLng(source.lat, source.lng).distanceTo(L.latLng(destination.lat, destination.lng));
  const distanceKm = (distance / 1000).toFixed(2);

  // Midpoint for distance label
  const midLat = (source.lat + destination.lat) / 2;
  const midLng = (source.lng + destination.lng) / 2;

  distanceLabel = L.marker([midLat, midLng], {
    icon: L.divIcon({
      className: 'distance-label',
      html: `<div style="padding:4px 8px;font-size:14px;font-family: Poppins">
               <h2>Distance: ${distanceKm}km</h2>
             </div>`
    }),
    interactive: false
  }).addTo(map);
}

function switchMap(){
  map.removeLayer(currentLayer);
      if (currentLayer === mapview) {
          currentLayer = satelliteLayer;
      } else {
          currentLayer = mapview;
      }
      map.addLayer(currentLayer);
}