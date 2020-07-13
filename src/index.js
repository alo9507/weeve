import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Create from "./create/Create";
import DiscussionSession from "./discussion/DiscussionSession";

import { Route, BrowserRouter as Router, Switch} from "react-router-dom";

const RoutingWrapper = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/:discussionID/:roomID?" component={DiscussionSession} />
    </Switch>
  </Router>
);

ReactDOM.render(RoutingWrapper, document.getElementById("root"));
