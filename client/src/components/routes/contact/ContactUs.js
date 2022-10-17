import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import emailjs from "@emailjs/browser";
import fabPro from "../../../img/fabPro.jpg";
import isrPro from "../../../img/isrPro.jpeg";
import wilPro from "../../../img/wilPro.jpeg";

export default function ContactUs() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState({});

  function contactHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    setValue((prevState) => {
      return { ...prevState, [element]: value };
    });
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4dho4yn",
        "template_pcnzc8y",
        e.target,
        "1ZmCKBSxMK_G_FGGc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
    );
    e.target.reset();
  };

  return (
    <div className="contactUsContainer">
      <div>
        <h1>Contact Us</h1>
        <div>
          <p>
            Please get in touch, and our expert support team will answer all
            your questions.
          </p>
        </div>
        <Form
          className="contactForm"
          onSubmit={sendEmail}
          onChange={contactHandler}
        >
          <FormGroup className="formGroup">
            <Input className="input"
              type="text"
              placeholder="Full Name"
              autoComplete=""
              name="user_name"
            />
          </FormGroup>
          <FormGroup className="formGroup">
            <Input className="input"
              type="email"
              placeholder="Email"
              autoComplete=""
              name="email"
            />
          </FormGroup>
          <FormGroup className="formGroup">
            <Input className="input"
              type="textarea"
              placeholder="Your Message"
              rows="12"
              cols="24"
              name="message"
            />
          </FormGroup>
          <div className="contactButtonContainer">
            <button className="ourButton" type="submit" value="send">
              send
            </button>
            <button className="ourButton" type="reset">
              reset
            </button>
          </div>
        </Form>
      </div>
      <div className="teamContainer">
        <h5 className="supportTeam">
          Meet our brilliant and knowledgeable support team
        </h5>
        <div className="ourTeam">
            <div className="teamMember">
              <img
                src={fabPro} 
                alt=""
              />
              <h4 className="teamMemberName">Fabio Petrella</h4>
          </div>
            <div className="teamMember">
              <img
                src={isrPro}
                alt=""
              />
              <h4 className="teamMemberName">Isra Gonzalez</h4>
          </div>
            <div className="teamMember">
              <img
                src={wilPro}
                alt=""
              />
              <h4 className="teamMemberName">William Mallak</h4>
            </div>
        </div>
      </div>
    </div>
  );
}
