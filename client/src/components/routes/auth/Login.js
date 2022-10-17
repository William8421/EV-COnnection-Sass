import { useState, useEffect, } from "react";
import {
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Fade,
} from "reactstrap";
import useAuth from "../../../context/authContext/useAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";


export default function Login({ modalLogin, toggleLogin, closeMenu }) {
  const { logIn, authToggle, setAuthToggle, loginError, resetError } =
    useAuth();
  const [requiredToggle, setRequiredToggle] = useState(false);

  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });

  function changeHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    setLogInForm((prevState) => {
      return { ...prevState, [element]: value };
    });
  }

  const [passToggle, setPassToggle] = useState({
    showPassword: "",
  });

  function show_hidePassword(e) {
    setPassToggle({
      ...passToggle,
      showPassword: e === passToggle.showPassword ? "" : e,
    });
  }
  useEffect(() => {
    if (authToggle.login) {
      closeMenu();
      toggleLogin();
      setAuthToggle({ signUp: false, login: false });
    }
  }, [authToggle.login]);

  useEffect(() => {
    setRequiredToggle(false);
    resetError();
  }, [modalLogin]);

  useEffect(() => {
    loginError ? setRequiredToggle(true) : setRequiredToggle(false);
  }, [loginError]);

  function submit(e) {
    e.preventDefault();
    logIn(logInForm);
    resetError();
  }

  return (
    <Modal isOpen={modalLogin} >
      <ModalHeader>Login
      <IoCloseOutline className="closeBTN" onClick={toggleLogin} role='button'/>

      </ModalHeader>
      <ModalBody>
      <Form onSubmit={(e) => submit(e)}>
        <div onChange={(e) => changeHandler(e)}>
          <FormGroup>
            <Input name="email" placeholder="email" type="email" required />
          </FormGroup>
          <FormGroup className="passwordFormGroup">
            <Input
              name="password"
              placeholder="password placeholder"
              type={
                passToggle.showPassword === "password" ? "text" : "password"
              }
              required
              minLength={6}
              autoComplete=""
            />
            {passToggle.showPassword === "password" ? (
              <AiOutlineEyeInvisible
                className="showHidePassword"
                onClick={() => show_hidePassword("password")}
              />
            ) : (
              <AiOutlineEye
                className="showHidePassword"
                onClick={() => show_hidePassword("password")}
              />
              )}
            </FormGroup>
            {requiredToggle && (
              <Fade className=" fade">
                Your 
                <span>
                  <b>Password</b>
                </span> or <span>
                  <b>E-mail</b>
                </span> is incorrect!
              </Fade>
            )}
          </div>
          <ModalFooter>
            <button className="ourButton" type="submit">Login</button>

          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
}
