mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hcXVpbm1hIiwiYSI6ImNtaDljOW1qdzBsZDAyanB2NDBtampndjcifQ.2-MkwRU0D_epq19-VY6JKg';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/joaquinma/cmhok75u6004a01ree7lnazuv',
    center: [123.03557212482107, 12.479971175561257], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 5 // starting zoom
      });

map.on('load', function() {
  map.addSource('points-data', {
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/jminantonio/Web-Map/refs/heads/main/data/Bases.geojson'
  });

  map.addLayer({
    id: 'points-layer',
    type: 'circle',
    source: 'points-data',
    paint: {
        'circle-color': '#4264FB',
        'circle-radius': 6,
        'circle-stroke-width': 5,
        'circle-stroke-color': '#ffffff'
    }
  });

  map.setPaintProperty('points-layer', 'circle-opacity', 0);
  map.setPaintProperty('points-layer', 'circle-stroke-opacity', 0);


  map.on('click', 'points-layer', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;

    const popupContent = `
          <div>
              <h3>${properties.Name}</h3>
              <p><strong>Date Built:</strong> ${properties.Built}</p>
              <p><strong>Location:</strong> ${properties.Location}</p>
              <p><strong>Announced to EDCA:</strong> ${properties.Added_to_EDCA}</p>
          </div>
    `;

    new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map);

  });

  // Change cursor to pointer when hovering over points
  map.on('mouseenter', 'points-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change cursor back when leaving points
  map.on('mouseleave', 'points-layer', () => {
    map.getCanvas().style.cursor = '';
  });

});

const toggleBases = document.getElementById('bases');
const basesList = document.getElementById('bases_list');

toggleBases.addEventListener('click', () => {
  if (basesList.style.display === 'block') {
    basesList.style.display = 'none';
  } else {
    basesList.style.display = 'block';
  }
});