import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ style, ...more }) => {
  const [position, setPosition] = useState([41.5583899,60.6215302]);
  const [zoom, setZoom] = useState(12);

  const MapClickHandler = () => {
    useMapEvents({
        zoomend: (event) => {
            setZoom(event.target.getZoom());
        },
        click(e) {            
            const { lat, lng } = e.latlng;
            const { _zoom } = e.target;
            setZoom(_zoom)
            setPosition([lat, lng]);
            fetchLocationName(lat, lng);
        },
    });
    return null;
  };


  return <MapContainer
        center={position}
        zoom={12}
        style={{ height: "400px", width: "100%", zIndex: 1, ...style, }}
        { ...more }
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={`&copy; <a href="https://www.google.com/maps?q=41.5583899,60.6215302">Open google map</a> contributors`}
        />
        <Marker position={position}></Marker>
        <MapClickHandler />
    </MapContainer>
};

export default MapComponent;
