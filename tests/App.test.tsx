import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

// No need to wrap in BrowserRouter since App already includes it
const renderApp = () => {
  window.history.pushState({}, "Test page", "/");
  return render(<App mode="light" toggleTheme={() => {}} />);
};

test("renders label merger link", () => {
  const { container } = renderApp();
  const linkElement = screen.getByText(/label merger/i);
  expect(linkElement).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("renders navigation links", () => {
  renderApp();

  const menu = screen.getByTestId("menu-button");
  expect(menu).toBeInTheDocument();
  fireEvent.click(menu);
  const mergeLabelsLink = screen.getByText(/merge labels/i);
  const analyticsLink = screen.getByText(/transaction analytics/i);
  expect(mergeLabelsLink).toBeInTheDocument();
  expect(analyticsLink).toBeInTheDocument();
});

test("navigation works correctly", () => {
  renderApp();

  const menu = screen.getByTestId("menu-button");
  expect(menu).toBeInTheDocument();
  fireEvent.click(menu);
  
  const mergeLabelsLink = screen.getByText(/merge labels/i);
  const analyticsLink = screen.getByText(/transaction analytics/i);
  expect(mergeLabelsLink).toBeInTheDocument();
  expect(analyticsLink).toBeInTheDocument();

  // Test label merger navigation
  fireEvent.click(mergeLabelsLink);
  expect(window.location.pathname).toBe("/labelMerger/");

  // Test analytics page navigation
  fireEvent.click(menu);
  fireEvent.click(analyticsLink);
  expect(window.location.pathname).toBe("/labelMerger/transactions/");
});
