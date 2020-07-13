import React, {useState } from "react";
import App from "../App";
import "./Create.css";
// import Background from '../images/background-image.jpg';
//
// var imageStyle = {
//   backgroundImage: "url(" + { Background } + ")"
// };

const Create = (props) => {
  return (
    <App>
      <div className="two-column">
        <div className="flex-item create-wrapper">
          <div className="create-content">
            <h1>Create A Session</h1>
            <p>Let's start creating a session, shall we?</p>
          </div>
        </div>
        <div className="flex-item full-image">
        </div>
      </div>
    </App>
  );
};

export default Create;
