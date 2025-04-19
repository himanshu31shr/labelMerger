import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../src/App";
import { HomePage } from "../src/pages/home/home.page";
import { OrderAnalyticsPage } from "../src/pages/orderAnalytics/orderAnalytics.page";

test("renders label merger link", () => {
  const { container } = render(<App />);
  const linkElement = screen.getByText(/label merger/i);
  expect(linkElement).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test("renders navigation links", () => {
  render(<App />);

  const menu = screen.getByTestId("menu-button");
  expect(menu).toBeInTheDocument();
  fireEvent.click(menu);
  const mergeLabelsLink = screen.getByText(/merge labels/i);
  const analyticsLink = screen.getByText(/analytics/i);
  expect(mergeLabelsLink).toBeInTheDocument();
  expect(analyticsLink).toBeInTheDocument();
});

test("routing works correctly", async () => {
  render(<App />);

  const menu = screen.getByTestId("menu-button");
  expect(menu).toBeInTheDocument();
  fireEvent.click(menu);
  const mergeLabelsLink = screen.getByText(/merge labels/i);
  const analyticsLink = screen.getByText(/analytics/i);
  expect(mergeLabelsLink).toBeInTheDocument();
  expect(analyticsLink).toBeInTheDocument();

  fireEvent.click(mergeLabelsLink);
  const homePageElement = await screen.findByText(
    /Please select AMAZON and FLIPKART labels correctly to process and merge the PDFs/gi
  ); // Adjust this based on actual content
  expect(homePageElement).toBeInTheDocument();

  fireEvent.click(menu);
  fireEvent.click(analyticsLink);
  const analyticsPageElement = await screen.findByText(/Flipkart/gi); // Adjust this based on actual content
  expect(analyticsPageElement).toBeInTheDocument();
});

test("renders HomePage component when navigating to /labelMerger/", async () => {
  render(
    <MemoryRouter initialEntries={["/labelMerger/"]}>
      <Routes>
        <Route path="/labelMerger/" element={<HomePage />} />
      </Routes>
    </MemoryRouter>
  );
  const homePageElement = await screen.findByText(
    /Please select AMAZON and FLIPKART labels correctly to process and merge the PDFs/gi
  ); // Adjust this based on actual content
  expect(homePageElement).toBeInTheDocument();
});

test("renders OrderAnalyticsPage component when navigating to /labelMerger/analytics/", async () => {
  render(
    <MemoryRouter initialEntries={["/labelMerger/analytics/"]}>
      <Routes>
        <Route
          path="/labelMerger/analytics/"
          element={<OrderAnalyticsPage />}
        />
      </Routes>
    </MemoryRouter>
  );
  const analyticsPageElement = await screen.findByText(/Flipkart/gi); // Adjust this based on actual content
  expect(analyticsPageElement).toBeInTheDocument();
});
