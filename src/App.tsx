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

const TransactionAnalytics = React.lazy(() =>
  import("./pages/transactionAnalytics/transactionAnalytics.page").then((module) => ({
    default: module.TransactionAnalytics,
  }))
);

export default function App({ toggleTheme, mode }: { 
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}) {
  return (
    <Router>
      <DefaultContainer toggleTheme={toggleTheme} mode={mode}>
        <div>
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route path="/labelMerger/" element={<HomePage />} />
              <Route path="/labelMerger/analytics/" element={<OrderAnalytics />} />
              <Route path="/labelMerger/transactions/" element={<TransactionAnalytics />} />
            </Routes>
          </Suspense>
        </div>
      </DefaultContainer>
    </Router>
  );
}
