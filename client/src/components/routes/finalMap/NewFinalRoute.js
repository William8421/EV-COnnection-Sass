import React, { useEffect, useState } from "react";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import RoutingComp from "../mainMap/RoutingComp";
import useMap from "../../../context/mapContext/useMap.js";

import { useNavigate, Link, useLocation } from "react-router-dom";
import noPhoto from "../../../img/noPhoto.png";
import route2 from "../../../img/route2.png";
import { Image } from "cloudinary-react";

function FinalRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  const {locations, ownerArray, getEndPoint } = useMap();
  const [newPosition, setNewPosition] = useState();
  const [newEndPoint, setNewEndPoint] = useState();
  const center = newPosition;
  console.log(newPosition);

  useEffect(() => {
    ownerArray("all");
    if (localStorage.getItem("position")) {
      const actualPosition = localStorage.getItem("position");
      const parsedPos = JSON.parse(actualPosition);
      setNewPosition(parsedPos);

      if (localStorage.getItem("goalpoint")) {
        const goalpoint = localStorage.getItem("goalpoint");
        console.log(JSON.parse(goalpoint));
        setNewEndPoint(JSON.parse(goalpoint));
      }
    }
  }, []);

  function getNewCoordinates(routeData) {
    localStorage.setItem("goalpoint", JSON.stringify(routeData));
    getEndPoint(routeData);
  }

  return (
    <>
      <div className="finalRouteContainer">
        <MapContainer center={center} zoom={6}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((item, idx) => (
            <Marker
              position={[item.latitude, item.longitude]}
              key={idx + "marker"}
            >
              <Popup>
                <div className="PopupImgContainer">
                  <Link to={`/userProfile/${item.id}`} state={{ id: item.id }}>
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
                  {newPosition && (
                    <Link
                      to={
                        location.pathname === "/calc_route"
                          ? "/calc_newroute"
                          : "/calc_route"
                      }
                      onClick={(e) =>
                        getNewCoordinates({
                          lat: item.latitude,
                          lng: item.longitude,
                        })
                      }
                    >
                      <div className="RouteImgContainer">
                        <img
                          className="mapProfileImg"
                          src={route2}
                          alt="route"
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {newPosition && (
            <RoutingComp
              from={[newPosition.lat, newPosition.lng]}
              to={[newEndPoint.lat, newEndPoint.lng]}
            >
              <Popup>
                <p>hello</p>
              </Popup>
            </RoutingComp>
          )}
        </MapContainer>
      </div>
      <div className="backButtonContainer">
        <button className="ourButton" onClick={() => navigate("/germany")}>
          Back
        </button>
      </div>
    </>
  );
}

export default FinalRoute;
