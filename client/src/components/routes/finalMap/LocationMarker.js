import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents, Tooltip } from "react-leaflet";
import useMap from "../../../context/mapContext/useMap.js";
import * as L from "leaflet";
import redPos from "../../../../src/img/redPos.png";

function LocationMarker() {
  const { getActualPosition } = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    getActualPosition(position);

    localStorage.setItem("position", JSON.stringify(position));
  }, [position]);
  const map = useMapEvents({
    dblclick() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const myIcon = L.icon({
    iconUrl: redPos,
    iconSize: [25, 42],
    iconAnchor: [14, 34],
    popupAnchor: [38, 38],
  });

  return position === null ? null : (
    <Marker position={position} icon={myIcon}></Marker>
  );
}

export default LocationMarker;
