import React, { useState } from 'react'
import Jitsi from 'react-jitsi'

const domain =  "167.172.10.231"
const roomName = 'abi'
const userFullName = 'Johann Strawberry'

const DiscussionRoom = (props) => {
  var roomID = props.match.params.roomID;

  return (
    <div className="App">
      <h1>{`Discussion Room ${roomID}`}</h1>
      <Jitsi roomName={roomName} displayName={userFullName} domain={domain} />
    </div>
  );
};

export default DiscussionRoom;
