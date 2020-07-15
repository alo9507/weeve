import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  fullImage: {
    backgroundImage: "url(./background-image.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPostition: "center",
    width: "50%"
  },
});

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
};

export default withStyles(styles, { withTheme: true })(Home);
