import React, {useState } from "react";
import JitsiInternal from "../../components/JitsiInternal/JitsiInternal";
import { withStyles } from "@material-ui/core/styles";

const domain = "167.172.10.231";
const userFullName = "Johann Strawberry";

const styles = theme => ({
});

class DiscussionSession extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussionID: '',
      topic: '',
      room: '',
      nextRoom: '',
      jitsiAPI: ''
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.switchToNext = this.switchToNext.bind(this);
    this.setRoom = this.setRoom.bind(this);
    this.setNextRoom = this.setNextRoom.bind(this);
    this.setJitsiAPI = this.setJitsiAPI.bind(this);
    this.handleAPI = this.handleAPI.bind(this);
    this.switchToNext = this.switchToNext.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({discussionID: this.props.match.params.discussionID, room: this.props.match.params.roomID});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  setDiscussionID(discussionID) {
    this.setState({discussionID: discussionID})
  }

  setNextRoom(nextRoom) {
    this.setState({nextRoom: nextRoom})
  }

  setRoom(room) {
    this.setState({room: room})
  }

  setJitsiAPI(api){
    this.setState({jitsiAPI: api});
  }

  handleAPI(api) {
    this.setJitsiAPI(api);
  };

  switchToNext() {
    console.log(this.state.jitsiAPI);
    this.state.jitsiAPI.dispose();
    this.setRoom(this.state.nextRoom);
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <h1>{`Discussion ${this.state.discussionID} in Room ${this.state.room}`}</h1>
        <JitsiInternal
          onAPILoad={this.handleAPI}
          roomName={this.state.room}
          displayName={userFullName}
          domain={domain}
        />
        <a href="#" onClick={() => this.switchToNext()}>
          Switch to Next Room
        </a>
      </div>
    );
  }
};

export default withStyles(styles, { withTheme: true })(DiscussionSession);

// Keeping Hook / Functional class for reference

// const DiscussionSession = (props) => {
//   const [discussionID, setDiscussionID] = useState(
//     props.match.params.discussionID
//   );
//
//   const [currentRoom, setCurrentRoom] = useState(
//     props.match.params.roomID ? props.match.params.roomID : "room1"
//   );
//
//   const [nextRoom, setNextRoom] = useState("room2");
//   const [jitsiAPI, setJitsiAPI] = useState("");
//
//   const handleAPI = (JitsiMeetAPI) => {
//     setJitsiAPI(JitsiMeetAPI);
//   };
//
//   const switchToNext = () => {
//     // Important to Dispose the backend and transport
//     jitsiAPI.dispose();
//     setCurrentRoom(nextRoom);
//   };
//
//   return (
//     <div>
//       <h1>{`Discussion ${discussionID} in Room ${currentRoom}`}</h1>
//       <JitsiInternal
//         onAPILoad={handleAPI}
//         roomName={currentRoom}
//         displayName={userFullName}
//         domain={domain}
//       />
//       <a href="#" onClick={() => switchToNext()}>
//         Switch to Next Room
//       </a>
//     </div>
//   );
// };
//
// export default DiscussionSession;
