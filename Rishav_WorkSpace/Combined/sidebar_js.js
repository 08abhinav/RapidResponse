document.getElementById('markerSelect_1').addEventListener('change', function () {
  const index = this.value;
  if (index !== "") {
      const marker = markers[index];
      const { coords } = locations[index];
      map.setView(coords, 23); // Zoom to marker
      marker.openPopup();      // Open the marker's popup
      }
  });

document.getElementById('markerSelect_2').addEventListener('change', function () {
  const index = this.value;
  if (index !== "") {
      const marker = markers[index];
      const { coords } = locations[index];
      map.setView(coords, 23); // Zoom to marker
      marker.openPopup();      // Open the marker's popup
      }
  });

  