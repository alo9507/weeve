import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import DiscussionSession from "./DiscussionSession";

import { Route, BrowserRouter as Router } from "react-router-dom";

const RoutingWrapper = (
  <Router>
    <Route exact path="/" component={App} />
    <Route exact path="/:discussionID/:roomID?" component={DiscussionSession} />
  </Router>
);

ReactDOM.render(RoutingWrapper, document.getElementById("root"));
