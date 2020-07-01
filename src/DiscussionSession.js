import React, { useState } from 'react'
import Jitsi from 'react-jitsi'

const domain =  "167.172.10.231"
const userFullName = 'Johann Strawberry'

class DiscussionSession extends React.Component {

  constructor(props) {
    super(props);

    // Load RoomIDs + Participants from controller server indexed by discussionID
    let currentRoom = props.match.params.roomID ? props.match.params.roomID : "room1";
    let nextRoom = "room2";

    console.log(props.match.params);

    this.state = {
      discussionID: props.match.params.discussionID,
      currentRoom: currentRoom,
      nextRoom: nextRoom,
      jitsiAPI: ''
    };

    this.handleAPI = this.handleAPI.bind(this);
    this.switchToNext = this.switchToNext.bind(this);
  }

  handleAPI(JitsiMeetAPI) {
    this.setState({jitsiAPI: JitsiMeetAPI});
  };

  switchToNext() {
    // Important to Dispose the backend and transport
    this.state.jitsiAPI.dispose();
    // TODO Crap approach, we should keep state and only re-render the Jitsi Component
    this.props.history.push("/"+this.state.discussionID+"/"+this.state.nextRoom);
    window.location.reload(false);
  }

  render() {
    return (
      <div className="App">
        <h1>{`Discussion ${this.state.discussionID} in Room ${this.state.currentRoom}`}</h1>
        <Jitsi onAPILoad={this.handleAPI} roomName={this.state.currentRoom} displayName={userFullName} domain={domain} />
        <a href="#" onClick={() => this.switchToNext()}>Switch to Next Room</a>
      </div>
    );
  }
}

export default DiscussionSession;
