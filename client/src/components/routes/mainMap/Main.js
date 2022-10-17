import { useState } from "react";
import {FormGroup, Input } from "reactstrap";

import MainMapComp from "../mainMap/MainMapComp.js";
import ModalSearchRoute from "./ModalSearchRoute.js";
import useAuth from "../../../context/authContext/useAuth.js";
import NotAuthorized from "../../error/NotAuthorized.js";

function MainMap() {
  const { isAuthenticated } = useAuth();
  const [chargerFilter, setChargerFilter] = useState({
    typeOfCharger: "all",
  });
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);

  return (
    <>
{isAuthenticated ? <>
      <div className="mainMapContainer">
        <div className="buttonContainer">
          <button className="ourButton" onClick={toggle}>Calculate Route </button>
        </div>

        <div className="filterContainer">
          <p>Filter by charger:</p>
          <FormGroup className="filterFromGroup">
            <Input
              name="typeOfCharger"
              type="select"
              bsSize="sm"
              onChange={(e) =>
                setChargerFilter({
                  ...chargerFilter,
                  typeOfCharger: e.target.value,
                })
              }
            >
              <option value="all">All</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="CCS">CCS</option>
              <option value="CHAdeMO">CHAdeMO</option>
            </Input>
          </FormGroup>
        </div>
      </div>
      <MainMapComp chargerFilter={chargerFilter} />
            <div>
        <ModalSearchRoute modal={modal} toggle={toggle} />
      </div>
      </>
  : <NotAuthorized />}
    </>
  );
}
export default MainMap;
