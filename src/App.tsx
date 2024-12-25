import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DefaultContainer } from "./containers/default/default.container";
import { CircularProgress } from "@mui/material";

const HomePage = React.lazy(() =>
  import("./pages/home/home.page").then((module) => ({
    default: module.HomePage,
  }))
);

const OrderAnalytics = React.lazy(() =>
  import("./pages/orderAnalytics/orderAnalytics.page").then((module) => ({
    default: module.OrderAnalyticsPage,
  }))
);

export default function App() {
  return (
    <Router>
      <DefaultContainer>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/labelMerger/" element={<HomePage />} />
            <Route path="/labelMerger/analytics/" element={<OrderAnalytics />} />
          </Routes>
        </Suspense>
      </DefaultContainer>
    </Router>
  );
}
