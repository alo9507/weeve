import React, {useState, useEffect } from "react";
import "./style.scss";
import JitsiInternal from "../../components/JitsiInternal/JitsiInternal";
import axios from 'axios';

const domain = "167.172.10.231";
const userFullName = "Johann Strawberry";


const DiscussionSession = (props) => {
  const [discussionID, setDiscussionID] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'api/discussions?discussionID='+props.match.params.discussionID,
      );

      if(result.data.length > 0){
        setDiscussionID(result.data[0].discussionID);
      }else{
        setDiscussionID(false);
      }
    };

    fetchData();
  }, []);

  if(discussionID){
    return (
      <div className="Stage-container">
        {discussionID &&
          <div>
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
        }
      </div>
    );
  }else{
    return (
      <div className="Stage-container">
        <h1>Not a valid discussion.</h1>
      </div>
    );
  }

};

export default DiscussionSession;
