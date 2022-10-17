import React, { useState } from "react";

import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

import { typeOfStreetDataset } from "../../../dataset/dataset.js";
import useMap from "../../../context/mapContext/useMap.js";

import { IoCloseOutline } from "react-icons/io5";

function ModalSearchRoute({ modal, toggle }) {
  const { routeCoordiantes } = useMap();
  const [routeForm, setRouteForm] = useState({
    fromCity: "",
    fromStreet: "",
    fromHouseNr: "",
    fromFtate: "Germany",
    fromStatecode: "DE",
    fromTypeOfStreet: "strasse",

    toCity: "",
    toStreet: "",
    toHouseNr: "",
    toFtate: "Germany",
    toStatecode: "DE",
    toTypeOfStreet: "strasse",
  });

  
  function routeChangeHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    setRouteForm((prevState) => {
      console.log(routeForm);
      return { ...prevState, [element]: value };
    });
  }
  
  function submit(e) {
    e.preventDefault();
    const isIncludedFrom = typeOfStreetDataset.filter((item) =>
      routeForm.fromStreet.toLowerCase().includes(item)
    );
    if (isIncludedFrom.length > 0) {
      const newStreet = isIncludedFrom.map((item) => {
        return routeForm.fromStreet.toLowerCase().split(item)[0].trim();
      });
      routeForm.fromStreet = newStreet[0].trim();
    } else {
      routeForm.fromStreet = routeForm.fromStreet.trim();
    }
    const isIncludedTo = typeOfStreetDataset.filter((item) =>
      routeForm.toStreet.toLowerCase().includes(item)
    );
    if (isIncludedTo.length > 0) {
      const newStreet = isIncludedTo.map((item) => {
        return routeForm.toStreet.toLowerCase().split(item)[0].trim();
      });
      routeForm.toStreet = newStreet[0].trim();
    } else {
      routeForm.toStreet = routeForm.toStreet.trim();
    }

    routeCoordiantes(routeForm);
  }
  return (
    <Modal isOpen={modal} toggle={toggle} /* external={externalCloseBtn} */>
      <Form onSubmit={(e) => submit(e)}>
        <ModalHeader>Calculate Route
        <IoCloseOutline
          className="closeBTN"
          onClick={toggle}
          role="button"
        />
        </ModalHeader>
        <ModalBody>
          <div onChange={(e) => routeChangeHandler(e)}>
            <FormGroup>
              <Label>From</Label>
              <Input
                required
                name="fromStreet"
                placeholder="street"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Input required name="fromTypeOfStreet" type="select" bsSize="13">
                <option value="strasse">strasse</option>
                <option value="damm">damm</option>
                <option value="alle">alle</option>
                <option value="chaussee">chaussee</option>
                <option value="gasse">gasse</option>
                <option value="landstrasse">landstrasse</option>
                <option value="pfad">pfad</option>
                <option value="platz">platz</option>
                <option value="ring">ring</option>
                <option value="steig">steig</option>
                <option value="ufer">ufer</option>
                <option value="weg">weg</option>
                <option value="zeile">zeile</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                required
                name="fromHouseNr"
                placeholder="houseNr"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Input required name="fromCity" placeholder="city" type="text" />
            </FormGroup>
            <FormGroup>
              <Label for="address">to</Label>
              <Input
                required
                name="toStreet"
                placeholder="street"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Input required name="toTypeOfStreet" type="select" bsSize="13">
                <option value="strasse">strasse</option>
                <option value="damm">damm</option>
                <option value="alle">alle</option>
                <option value="chaussee">chaussee</option>
                <option value="gasse">gasse</option>
                <option value="landstrasse">landstrasse</option>
                <option value="pfad">pfad</option>
                <option value="platz">platz</option>
                <option value="ring">ring</option>
                <option value="steig">steig</option>
                <option value="ufer">ufer</option>
                <option value="weg">weg</option>
                <option value="zeile">zeile</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                required
                name="toHouseNr"
                placeholder="houseNr"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Input required name="toCity" placeholder="city" type="text" />
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="ourButton"  onClick={submit} type="submit">
            calculate
          </button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default ModalSearchRoute;
