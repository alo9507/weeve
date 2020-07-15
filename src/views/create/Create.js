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
      discussionLink: '',
      open: true,
      width: '',
      height: ''
    };
    this.setDiscussionID = this.setDiscussionID.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  setDiscussionID(discussionID) {
    if (typeof window !== 'undefined') {
      var path = window.location.protocol + '//' + window.location.host + '/discussion/' + discussionID; // (or whatever)
      this.setState({discussionLink: path, open: true});
    } else {
      // work out what you want to do server-side...
    }
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
              <CreateForm updateDiscussionID={this.setDiscussionID}></CreateForm>
            </div>
          </div>
          <div className={`${classes.fullImage} flex-item`}>
          </div>
        </div>
        {this.state.discussionLink.length > 0 &&
        <CopyDiscussionDialog open={this.state.open} onClose={this.handleClose} discussionLink={this.state.discussionLink} width={this.state.width}  height={this.state.height} copied={false}></CopyDiscussionDialog>
        }
      </App>
    );
  }
};

export default withStyles(styles, { withTheme: true })(Create);
