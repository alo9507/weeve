import React, {useState } from "react";
import JitsiInternal from "./JitsiInternal";

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
    jitsiAPI.executeCommand('hangup');
    // TODO Another hack to change rooms - incomplete since we need to pass a different password per room (for example of invariability on each step)
    let ff = jitsiAPI.getIFrame();
    ff.src = "https://"+domain+"/"+nextRoom

    // TODO Crap approach, we should keep state and only re-render the Jitsi Component
    // props.history.push("/" + discussionID + "/" + nextRoom);
    // window.location.reload(false);
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
