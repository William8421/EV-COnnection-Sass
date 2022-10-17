import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { AiFillCheckCircle } from "react-icons/ai";
import useAuth from "../../../context/authContext/useAuth";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";

function EditProfile({ editToggle, setEditToggle }) {
  const { userInfo, editUserProfile } = useAuth();

  // show and hide wall-box owner state
  const [registerToggle, setRegisterToggle] = useState(false);

  // register information state
  const [registerForm, setRegisterForm] = useState({});

  const [toggleImg, setToggleImg] = useState(false);

  useEffect(() => {
    if (userInfo.isOwner) {
      setRegisterForm({ ...userInfo, _id: "" });
      setRegisterToggle(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function registerFormHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    setRegisterForm((prevState) => {
      return { ...prevState, [element]: value };
    });
  }

  // address changes function
  function addressHandler(e) {
    const element = e.target.name;
    const value = e.target.value;

    setRegisterForm((prevState) => {
      return {
        ...prevState,
        address: { ...prevState.address, [element]: value },
      };
    });
  }
  /****** IMAGES ***** */
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "schoolGroup");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/schoolgroupfinal/image/upload",
        formData
      )
      .then((response) => {
        setRegisterForm({ ...registerForm, imgProfile: response.data.url });
        setToggleImg(true);
      })
      .catch((err) => {
        setRegisterForm({ ...registerForm, imgProfile: "no_photo" });
        return console.log(err);
      });
  };
  /********************* */

  function submit(e) {
    e.preventDefault();

    editUserProfile(registerForm);
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      user = {
        id: user.id,
        token: user.token,
        username: registerForm.username,
        imgProfile: registerForm.imgProfile,
      };
      localStorage.setItem("user", JSON.stringify(user));
    }
    setEditToggle(false);
  }
  useEffect(() => {
    setToggleImg(false);
  }, [imageSelected]);
  return (
    <Modal isOpen={editToggle}>
      <ModalHeader>
        Edit Profile
        <IoCloseOutline
          className="closeBTN"
          onClick={() => setEditToggle(false)}
          role="button"
        />
      </ModalHeader>
      <ModalBody>
        <Form>
          <div onChange={(e) => registerFormHandler(e)}>
            <FormGroup>
              <div className="uploadImageContainer">
                <Input
                  type="file"
                  onChange={(e) => setImageSelected(e.target.files[0])}
                />

                {toggleImg ? (
                  <AiFillCheckCircle className="checkIcon" />
                ) : (
                  <AiFillCheckCircle className="checkIconEmpty" />
                )}
              </div>
              <button className="ourButton" outline onClick={uploadImage}>
                Upload Image
              </button>
            </FormGroup>
            {userInfo.isOwner ? (
              <FormGroup onChange={() => setRegisterToggle(!registerToggle)}>
                <Input name="isOwner" type="select" bsSize="2">
                  <option value={true}>Wall-Box Owner</option>
                  <option value={false}>Car Owner</option>
                </Input>
              </FormGroup>
            ) : (
              <FormGroup onChange={() => setRegisterToggle(!registerToggle)}>
                <Input required name="isOwner" type="select" bsSize="2">
                  <option value={false}>Car Owner</option>
                  <option value={true}>Wall-Box Owner</option>
                </Input>
              </FormGroup>
            )}
            <FormGroup>
              <Input
                name="username"
                placeholder={userInfo.username}
                type="text"
                maxLength={16}
              />
            </FormGroup>
            <div className="inputContainer">
              <FormGroup>
                <Input name="fname" placeholder={userInfo.fname} type="text" />
              </FormGroup>
              <FormGroup>
                <Input name="lname" placeholder={userInfo.lname} type="text" />
              </FormGroup>
            </div>

            {registerToggle && (
              <>
                <div onChange={(e) => registerFormHandler(e)}>
                  <FormGroup>
                    <Label><b>Type of charger</b></Label>
                    <Input name="typeOfCharger" type="select" bsSize="large">
                      <option value="Type 1">Type 1</option>
                      <option value="Type 2">Type 2</option>
                      <option value="CCS">CCS</option>
                      <option value="CHAdeMO">CHAdeMO</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label><b>Availability</b></Label>
                    <Input name="availability" type="select" bsSize="3">
                      <option value="whole_week">Whole Week</option>
                      <option value="not_weekend">Not on the Weekend</option>
                      <option value="night_avaiable">Night Availability</option>
                    </Input>
                  </FormGroup>
                </div>

                <div onChange={(e) => addressHandler(e)}>
                  <Label>
                    {" "}
                    <b>Address</b>
                  </Label>

                  <FormGroup>
                    <Input
                      name="city"
                      placeholder={userInfo.address.city}
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      name="street"
                      placeholder={userInfo.address.street}
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input name="type" type="select" bsSize="13">
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

                  <div className="inputContainer">
                    <FormGroup className="houseNumber">
                      <Input
                        name="houseNr"
                        placeholder={userInfo.address.houseNr}
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup className="postalCode">
                      <Input
                        name="postalcode"
                        placeholder={userInfo.address.postalcode}
                        type="text"
                      />
                    </FormGroup>
                  </div>
                </div>
              </>
            )}
            <ModalFooter>
              <button className="ourButton" onClick={submit}>Save</button>
            </ModalFooter>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default EditProfile;
