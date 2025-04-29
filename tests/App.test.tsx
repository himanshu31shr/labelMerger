import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

jest.mock("firebase/auth");

const renderApp = () => {
  window.history.pushState({}, "Test page", "/labelMerger/");
  return render(<App mode="light" toggleTheme={() => {}} />);
};

test("renders navigation when authenticated", async () => {
  renderApp();

  await waitFor(() => {
    const mergeLabelsLink = screen.getByTestId("merge-labels");
    expect(mergeLabelsLink).toBeInTheDocument();
  });
});

test("renders all navigation links", async () => {
  renderApp();

  await waitFor(() => {
    const mergeLabelsLink = screen.getByTestId("merge-labels");
    const productsLink = screen.getByTestId("products");
    const transactionsLink = screen.getByTestId("transactions");
    
    expect(mergeLabelsLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(transactionsLink).toBeInTheDocument();
  });
});

test("navigation works correctly", async () => {
  renderApp();

  await waitFor(async () => {
    const productsLink = screen.getByTestId("products");
    fireEvent.click(productsLink);
    expect(window.location.pathname).toBe("/labelMerger/products/");

    const transactionsLink = screen.getByTestId("transactions");
    fireEvent.click(transactionsLink);
    expect(window.location.pathname).toBe("/labelMerger/transactions/");

    const mergeLabelsLink = screen.getByTestId("merge-labels");
    fireEvent.click(mergeLabelsLink);
    expect(window.location.pathname).toBe("/labelMerger/");
  });
});
