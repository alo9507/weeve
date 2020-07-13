import React, {useState } from "react";
import JitsiInternal from "../JitsiInternal";

const domain = "167.172.10.231";
const userFullName = "Johann Strawberry";

const DiscussionSession = (props) => {
  const [discussionID, setDiscussionID] = useState(
    props.match.params.discussionID
  );

  const [currentRoom, setCurrentRoom] = useState(
    props.match.params.roomID ? props.match.params.roomID : "room1"
  );

  const [nextRoom, setNextRoom] = useState("room2");
  const [jitsiAPI, setJitsiAPI] = useState("");

  const handleAPI = (JitsiMeetAPI) => {
    setJitsiAPI(JitsiMeetAPI);
  };

  const switchToNext = () => {
    // Important to Dispose the backend and transport
    jitsiAPI.dispose();
    setCurrentRoom(nextRoom);
  };

  return (
    <div className="App">
      <h1>{`Discussion ${discussionID} in Room ${currentRoom}`}</h1>
      <JitsiInternal
        onAPILoad={handleAPI}
        roomName={currentRoom}
        displayName={userFullName}
        domain={domain}
      />
      <a href="#" onClick={() => switchToNext()}>
        Switch to Next Room
      </a>
    </div>
  );
};

export default DiscussionSession;
