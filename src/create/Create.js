import React from "react";
import App from "../App";
import "./Create.scss";
import { makeStyles } from '@material-ui/core/styles';
import CreateForm from "./CreateForm";
// import Background from '../images/background-image.jpg';
//
// var imageStyle = {
//   backgroundImage: "url(" + { Background } + ")"
// };

const useStyles = makeStyles({
  fullImage: {
    backgroundImage: "url(./background-image.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPostition: "center",
    width: "50%"
  },
});

const Create = (props) => {
  const classes = useStyles();
  return (
    <App>
      <div className="two-column">
        <div className="flex-item create-wrapper">
          <div className="create-content">
            <h1>Create A Session</h1>
            <p>Let's start creating a session, shall we?</p>
            <CreateForm></CreateForm>
          </div>
        </div>
        <div className={`${classes.fullImage} flex-item`}>
        </div>
      </div>
    </App>
  );
};

export default Create;
