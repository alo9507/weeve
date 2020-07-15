import React from "react";
import App from "../../components/App";
import "./Create.scss";
import { withStyles } from "@material-ui/core/styles";
import CreateForm from "../../components/CreateForm";
import CopyDiscussionDialog from "../../components/CopyDiscussionDialog";

const styles = theme => ({
  fullImage: {
    backgroundImage: "url(./background-image.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPostition: "center",
    width: "50%"
  },
});

class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussionID: '',
      open: false
    };
    this.updateDiscussionID = this.updateDiscussionID.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  updateDiscussionID(discussionID) {
    this.setState({discussionID: discussionID, open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render(){
    const { classes } = this.props;
    return (
      <App>
        <div className="two-column">
          <div className="flex-item create-wrapper">
            <div className="create-content">
              <h1>Create A Session</h1>
              <p>Let's create session goodness, shall we?</p>
              <CreateForm updateDiscussionID={this.updateDiscussionID}></CreateForm>
            </div>
          </div>
          <div className={`${classes.fullImage} flex-item`}>
          </div>
        </div>
        {this.state.discussionID.length > 0 &&
        <CopyDiscussionDialog open={this.state.open} onClose={this.handleClose} discussionLink={this.state.discussionID}></CopyDiscussionDialog>
        }
      </App>
    );
  }
};

export default withStyles(styles, { withTheme: true })(Create);
