import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { FaBars } from "react-icons/fa";
import { GoPlug } from "react-icons/go";

import LoginModal from "../routes/auth/Login.js";
import Register from "../routes/auth/Register.js";

import { Link, useLocation } from "react-router-dom";
import useAuth from "../../context/authContext/useAuth.js";
import noPhoto from "../../img/noPhoto.png";
import logosmall from "../../img/logosmall.png";
import { AiFillCar } from "react-icons/ai";
import { Image } from "cloudinary-react";

export default function NavBar() {
  const { tokenValidator, signOut, isAuthenticated} =
    useAuth();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [modalLogin, setModalLogin] = useState(false);
  const toggleLogin = () => setModalLogin(!modalLogin);

  const [modalRegister, setModalRegister] = useState(false);
  const toggleRegister = () => setModalRegister(!modalRegister);

  const [show, setShow] = useState(false);
  function closeMenu() {
    setShow(false);
  }

  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user)
      tokenValidator();
      setUser(parsedUser)
    } else {
      setUser({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isAuthenticated, show]);

  function loggingOut() {
    signOut();
    setShow(false);
  }

  return (
    <div className="navBarContainer">
      <div>
        <img src={logosmall} alt="logo" />
      </div>
      <div className="burgerbutton">
        {isAuthenticated && <AiFillCar className="carLogo" />}
        <button
          onClick={function noRefCheck() {
            setShow(true);
          }}
        >
          <FaBars className="burgerIcon" />
        </button>
        <Offcanvas
        className="offCanvas"
          isOpen={show}
          direction="end"
          toggle={function noRefCheck() {
            setShow(false);
          }}
        >
          <OffcanvasHeader
            toggle={function noRefCheck() {
              setShow(false);
            }}
            className="offCanvasHeader"
          >
            {isAuthenticated  ? (
              <>

                <Link to="/account" onClick={() => setShow(false)} className="account">
                  {user.imgProfile && user.imgProfile !== "no_photo" ? (
                    <>
                      <div>
                        <Image

                          cloudName="schoolgroupfinal"
                          publicId={user.imgProfile}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Image
                          src={noPhoto}
                          alt="user"
                        />
                      </div>
                    </>
                  )}
                  <p>My Profile</p>
                  
                </Link>
              </>
            ) : (
              <button className="joinButton" onClick={toggleRegister}>
                Join the community
              </button>
            )}

            <Register
              modalRegister={modalRegister}
              toggleRegister={toggleRegister}
              closeMenu={closeMenu}
            />
          </OffcanvasHeader>

          <OffcanvasBody>
            <strong className="strong">
              <Link
                className="link"
                onClick={closeMenu}
                to="/"
              >
                <div>
                  <GoPlug className="plug" />
                  Home
                </div>
              </Link>
              <Link
                className="link"
                onClick={closeMenu}
                to="aboutus"
              >
                <div>
                  <GoPlug className="plug" />
                  About us
                </div>
              </Link>

              {isAuthenticated && <Link
                className="link"
                onClick={closeMenu}
                to="germany"
              >
                <div>
                  <GoPlug className="plug" />
                  Map
                </div>
              </Link>}
              {isAuthenticated && 
              <Link
                className="link"
                onClick={closeMenu}
                to="board"
              >
                <div>
                  <GoPlug className="plug" />
                  Message Board
                </div>
              </Link>
              }
              <Link
                className="link"
                onClick={closeMenu}
                to="contact"
              >
                <div>
                  <GoPlug className="plug" />
                  Contact us
                </div>
              </Link>

              {!isAuthenticated ? (
                <div className="logInOut" onClick={toggleLogin} role="button">
                  Login
                </div>
              ) : (
                <div className="logInOut" role="button" onClick={loggingOut}>
                  Sign Out
                </div>
              )}
              <LoginModal
                modalLogin={modalLogin}
                toggleLogin={toggleLogin}
                closeMenu={closeMenu}
              />
            </strong>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </div>
  );
}