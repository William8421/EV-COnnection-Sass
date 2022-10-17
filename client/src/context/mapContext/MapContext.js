import { createContext, useReducer } from "react";
import { getAllOwners, getRouteCoordiantes } from "../../utils/axios-utils.js";

import mapReducer, { mapState } from "./mapReducer.js";
import { useNavigate } from "react-router-dom";


export const MapContext = createContext(mapState);

export const MapProvider = ({ children }) => {
const navigate =  useNavigate()
  const [state, dispatch] = useReducer(mapReducer, mapState);

  function ownerArray(typeOfCharger) {
    let ownersArray = [];
    (async () => {
      const response = await getAllOwners(typeOfCharger);
      
      try {
        response.data.map((item) => {
          const userAddress = {
            /**** later on we have to delete ****/
            username: item.username,
            id: item.id,
            street: item.address.street,
            houseNr: item.address.houseNr,
            city: item.address.city,
            typeOfCharger: item.typeOfCharger,
            /********************************** */
            latitude: item.addressInfo.latitude,
            longitude: item.addressInfo.longitude,
            imgProfile: item.imgProfile
          };

          ownersArray.push(userAddress);
        });
        dispatch({ type: "ADD_POS", payload: ownersArray });
      } catch (err) {
        console.log(err);
      }
    })();
    return ownersArray;
  }

  function getEndPoint(endPoint) {
    
    dispatch({ type: "CAlC_ENDPOINT", payload: endPoint });
  }
  function getActualPosition(startPoint) {
    dispatch({ type: "START_POINT", payload: startPoint });
  }

  async function routeCoordiantes(routeForm) {
    const response = await getRouteCoordiantes(routeForm);
    try {
      localStorage.setItem("goalpoint", JSON.stringify(response.data.endLat_Long))
      localStorage.setItem("position", JSON.stringify(response.data.startLat_Long))
      dispatch({ type: "CALC_ROUTE", payload:{startLat_Long:  response.data.startLat_Long, endLat_Long: response.data.endLat_Long}});
      navigate("/calc_route")
    } catch (err) {
      console.log(err)
    }
  }
  
  const value = {
    ownerArray,
    locations: state.locations,
    getEndPoint,
    endPoint: state.endPoint,
    getActualPosition,
    startPoint: state.startPoint,
    routeCoordiantes,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
