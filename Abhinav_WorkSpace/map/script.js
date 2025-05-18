const map = L.map('map').setView([30.267843, 77.995722], 14)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const graphicEraIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
})

let graphicEraMarker = null
let indireshMarker = null;

async function loadLocation() {
    try {
        const res = await fetch('locations.json');
        const data = await res.json();

        for(const [name, loc] of Object.entries(data)){
            const mark = L.marker([loc.lat, loc.lon],{
                icon: name.includes("Graphic Era Deemed to be University, Dehradun") ? graphicEraIcon : L.Icon.Default.prototype
            }).addTo(map);
            mark.bindPopup(`<b>${name}</b><br>${loc.type ?? 'Hospital'}`);

            if(name == "Graphic Era Deemed to be University, Dehradun"){
                graphicEraMarker = mark;
            }
        }
        if(graphicEraMarker){
            graphicEraMarker.openPopup();
        }

        //Graphic era to Indiresh hospital highlight
        if (data["Graphic Era Deemed to be University, Dehradun"] && data["Shri Mahant Indiresh Hospital, Dehradun"]) {
            const from = data["Graphic Era Deemed to be University, Dehradun"];
            const to = data["Shri Mahant Indiresh Hospital, Dehradun"];

            const routeCoords = [
                [from.lat, from.lon],
                [to.lat, to.lon]
            ];

            const routeLine = L.polyline(routeCoords, {
                color: 'blue',
                weight: 5,
                opacity: 0.7,
                dashArray: '5, 10'
            }).addTo(map);
            
            map.fitBounds(routeLine.getBounds());
        }

    } catch (error) {
        console.log("error: ", error.message)
    }
    
}




loadLocation();
