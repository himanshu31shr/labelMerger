import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { LoginPage } from "./pages/auth/login.page";
import React from "react";

export default function App({
  toggleTheme,
  mode,
}: {
  toggleTheme: () => void;
  mode: "light" | "dark";
}) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Suspense
        fallback={
          <CircularProgress data-testid="loading-progress" color="success" />
        }
      >
        <Routes>
          <Route path="/flipkart-amazon-tools/login" element={<LoginPage />} />
          <Route
            path="/flipkart-amazon-tools/*"
            element={
              <ProtectedRoute>
                <ProtectedRoutes toggleTheme={toggleTheme} mode={mode} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Box>
  );
}
