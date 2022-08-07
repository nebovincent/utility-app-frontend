import Container from "components/utility/Container";
import classes from "components/MapJs/MapJs.module.css";
import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapJs() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibmVib3ZpbmNlbnQ1MCIsImEiOiJjbDU2cTc2NzAxbHVsM290ZHByN3R3NndlIn0.G2K9OXRy3PqOO1_2SHXMKg";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  // trying to add search

  // trying to add search

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <Container className={classes.map__container_main}>
      <h1>MAP</h1>

      <div ref={mapContainer} className="map-container" />
    </Container>
  );
}

export default MapJs;
