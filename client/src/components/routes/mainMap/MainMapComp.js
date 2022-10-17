import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";

import LocationMarker from "../finalMap/LocationMarker.js";

import useMap from "../../../context/mapContext/useMap.js";
import useAuth from "../../../context/authContext/useAuth.js";

import noPhoto from "../../../img/noPhoto.png";
import route2 from "../../../img/route2.png";
import { Image } from "cloudinary-react";

function MainMapComp({ chargerFilter }) {
  const { isAuthenticated } = useAuth();

  const center = [50.56, 9.71];

  const { locations, ownerArray, startPoint, getEndPoint } = useMap();

  useEffect(() => {
    ownerArray(chargerFilter.typeOfCharger);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargerFilter]);

  function getCoordinates(routeData) {
    localStorage.setItem("goalpoint", JSON.stringify(routeData))
    
    getEndPoint(routeData);
  }

  return (
    <>
      <div className="mainMapCompContainer">

        <MapContainer
          center={center}
          zoom={6}
          className="leaflet-container fullscreen"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {isAuthenticated
            ? locations.map((item, idx) => (
                <Marker
                  position={[item.latitude, item.longitude]}
                  key={idx + "marker"}
                >
                  <Popup>
                    <div className="PopupImgContainer">
                      <Link
                        to={`/userProfile/${item.id}`}
                        state={{ id: item.id }}
                      >
                        {item.imgProfile && item.imgProfile !== "no_photo" ? (
                          <Image
                            className="mapProfileImg"
                            cloudName="schoolgroupfinal"
                            publicId={item.imgProfile}
                          />
                        ) : (
                          <Image className="mapProfileImg" src={noPhoto} alt="user" />
                        )}
                      </Link>
                    </div>
                    <div className="mapUserName">
                      <h5>
                        <b>{item.username}</b>
                      </h5>
                      <h5>{item.typeOfCharger}</h5>
                      {startPoint !== null && (
                        <Link
                          to="/calc_route"
                          onClick={(e) =>
                            getCoordinates({
                              lat: item.latitude,
                              lng: item.longitude,
                            })
                          }
                        >
                          <div className="RouteImgContainer">
                            <img className="mapProfileImg" src={route2} alt="route" />
                          </div>
                        </Link>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))
            : locations.map((item, idx) => (
                <CircleMarker
                  center={[item.latitude, item.longitude]}
                  pathOptions={{
                    fillColor: "blue",
                    fillOpacity: 0.6,
                    color: "lightblue",
                  }}
                  radius={10}
                  key={idx + "marker"}
                >
                  <Popup>
                    <p>
                      <b>{item.username}</b>
                    </p>
                  </Popup>
                </CircleMarker>
              ))}
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
}

export default MainMapComp;
