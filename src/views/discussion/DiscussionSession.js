import React, {useState, useEffect } from "react";
import "./style.scss";
import JitsiInternal from "../../components/JitsiInternal/JitsiInternal";
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const domain = "167.172.10.231";
const userFullName = "Johann Strawberry";


const DiscussionSession = (props) => {
  const [discussionID, setDiscussionID] = useState('');

  const [currentRoomId, setCurrentRoomId] = useState('');
  const [discussion, setDiscussion] = useState({});

  const [jitsiAPI, setJitsiAPI] = useState("");

  const handleAPI = (JitsiMeetAPI) => {
    setJitsiAPI(JitsiMeetAPI);
  };

  const switchToNext = async () => {
    // Important to Dispose the backend and transport
    jitsiAPI.dispose();

    const result = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3001/discussions/nextRoom',
      headers: {"Access-Control-Allow-Origin": "*"},
      data: {
        discussionID: discussionID,
        userID: cookies.get("userID")
      }
    }).catch(function (error) {
      console.log("ERROR!", error.message);
    });

    if (result?.data?.discussion){
      setCurrentRoomId(result.data.roomID);
      setDiscussion(result.data.discussion)
    } else {
      setDiscussionID(false);
    }
  };

  useEffect(() => {
    const { currentStage, stagesDuration } = discussion
    console.log(currentStage)
    console.log(stagesDuration)
    const roomTransferTime = stagesDuration[currentStage]

    setTimeout(switchToNext, roomTransferTime - Date.now());
  }, []) // change on current stage change

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'post',
        url: 'http://127.0.0.1:3001/discussions/join',
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
          discussionID: props.match.params.discussionID,
          userID: cookies.get("userID")
        }
      });

      if (result.data?.discussion) {
        cookies.set('userID', result.data.userID, { path: '/' });
        console.log("data:",result.data)
        setDiscussionID(result.data.discussion.discussionID);
        setCurrentRoomId(result.data.roomID);
      } else {
        setDiscussionID(false);
      }
    };

    fetchData();
  }, []);

  if(discussionID && currentRoomId){
    return (
      <div className="Stage-container">
        {discussionID &&
          <div>
            <h1>{`Discussion ${discussionID} in Room ${currentRoomId} at stage`}</h1>
            <JitsiInternal
              onAPILoad={handleAPI}
              roomName={currentRoomId}
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
