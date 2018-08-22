import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
//components
import App from "./App";
import Root from "./Root";
import Landing from "./components/Landing";
//

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Landing} />
      </App>
    </BrowserRouter>
  </Root>,
  document.getElementById("root")
);
registerServiceWorker();
