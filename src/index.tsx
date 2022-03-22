import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import rootRouter from "./routers";

const GetRoutes = () => {
  const element = useRoutes(rootRouter);

  return <>{element}</>;
};

const App = () => {
  return (
    <Router>
      <GetRoutes></GetRoutes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
