import React from "react";

const DiscussionRoom = (props) => {
  var roomID = props.match.params.roomID;

  return (
    <div className="App">
      <h1>{`Discussion Room ${roomID}`}</h1>
    </div>
  );
};

export default DiscussionRoom;
