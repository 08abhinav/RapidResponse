const allLocations = [
    { lat: 30.268904, lng: 77.9905642, name: 'Graphic Era Deemed to be University' },
    { lat: 30.258485, lng: 77.984587, name: 'Graphic Era Hill University' },
    { lat: 30.2893203, lng: 77.9971436, name: 'ISBT Dehradun' },
    { lat: 30.2670128, lng: 77.935311, name: 'Subhash Nagar' },
    {lat: 30.304785, lng: 78.0209032, name: 'Shri Mahant Indiresh Hospital, Dehradun' },
    { lat: 30.3165, lng: 78.0322, name: 'Dehradun Railway Station' },
    {lat: 30.3736727, lng: 78.0711262, name: 'Max Super Speciality Hospital, Dehradun' },
    {lat: 30.350057, lng: 77.8915375, name: 'Graphic Era Institute of Medical Sciences' },
    {lat: 30.291798, lng: 78.050898, name: 'Kanishk Surgical & Super Specialty Hospital, Dehradun' },
    { lat: 30.2727947, lng: 78.000611, name: 'Vibhuti Super Speciality Hospital, Dehradun' },
    {lat: 30.259999, lng: 78.032327, name: 'R G Hospital, Dehradun' },
    { lat: 30.338277, lng: 78.020613, name: 'Power Life care Hospital, Dehradun' },
  ];//This array contains all the locations with their latitude, longitude and name

  const map = L.map('map').setView([30.268904, 77.9905642], 13);//setView is used to set the initial view of the map

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' OpenStreetMap'
  }).addTo(map);

  // Add all markers
  allLocations.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.name);
  });

  let currentLine;//currentLine is used to store the current polyline
  let distanceLabel;//distanceLabel is used to store the distance label

  function connectRoute() {
    // Remove old line and label
    if (currentLine) 
    map.removeLayer(currentLine);
    if (distanceLabel) 
    map.removeLayer(distanceLabel);

    const sourceInput = document.getElementById('source').value.toLowerCase().trim();
    const destInput = document.getElementById('destination').value.toLowerCase().trim();

    const source = allLocations.find(loc => loc.name.toLowerCase() === sourceInput);
    const destination = allLocations.find(loc => loc.name.toLowerCase() === destInput);

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
        html: `<div style="padding:4px 8px;font-size:14px;">
                 Distance: ${distanceKm}km
               </div>`
      }),
      interactive: false
    }).addTo(map);
  }