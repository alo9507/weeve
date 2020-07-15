import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Create from "./views/create/Create";
import DiscussionSession from "./views/discussion/DiscussionSession";

import { Route, BrowserRouter as Router, Switch} from "react-router-dom";

const RoutingWrapper = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/discussion/:discussionID/:roomID?" component={DiscussionSession} />
    </Switch>
  </Router>
);

ReactDOM.render(RoutingWrapper, document.getElementById("root"));
