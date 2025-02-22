import React from "react";
import { useRoutes } from "react-router-dom";
import { PATHS } from "./config/path";

import { BoxBlock, HomePage, Snake } from "./pages";
import "./app-route.css";

const RoutesItem: React.FC = () => {
  return useRoutes([
    { path: PATHS.HOMEPAGE, element: <HomePage /> },
    { path: PATHS.SNAKE, element: <Snake /> },
    { path: PATHS.BOX_BLOCK, element: <BoxBlock /> },
  ]);
};

const AppRoute: React.FC = () => {
  return (
    <div className="rgx-app-route">
      <div className="rgx-app-route-main-content">
        <RoutesItem />
      </div>
    </div>
  );
};

export default AppRoute;
