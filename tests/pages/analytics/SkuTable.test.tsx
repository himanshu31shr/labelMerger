import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SkuTable } from "../../../src/pages/orderAnalytics/SkuTable";

const mockSkus = {
  sku1: { orders: 10, returns: 2, title: "Product 1" },
  sku2: { orders: 5, returns: 1, title: "Product 2" },
};

describe("SkuTable", () => {
  test("renders without crashing", () => {
    expect(render(<SkuTable skus={mockSkus} open={true} />).container).toMatchSnapshot();
  });

  test("renders table headers", () => {
    render(<SkuTable skus={mockSkus} open={true} />);
    expect(screen.getByText("SKU")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Returns")).toBeInTheDocument();
  });

  test("renders table rows with correct data", () => {
    render(<SkuTable skus={mockSkus} open={true} />);
    expect(screen.getByText("sku1")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("sku2")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("collapses table when open is false", () => {
    render(<SkuTable skus={mockSkus} open={false} />);
    expect(screen.queryByText("sku1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("10")).not.toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();

    expect(screen.queryByText("sku2")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
    expect(screen.queryByText("5")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});