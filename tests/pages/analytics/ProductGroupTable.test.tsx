import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductGroupTable } from "../../../src/pages/orderAnalytics/ProductGroupTable";
import { Group } from "../../../src/pages/orderAnalytics/types/group.type";

const mockGroupedData: Group[] = [
  {
    group: "Group A",
    orders: 10,
    returns: 2,
    skus: {
      sku1: {
        orders: 5,
        returns: 1,
        title: "",
      },
      sku2: {
        orders: 5,
        returns: 1,
        title: "",
      },
    },
  },
  {
    group: "Group B",
    orders: 20,
    returns: 4,
    skus: {
      sku3: {
        orders: 10,
        returns: 2,
        title: "",
      },
      sku4: {
        orders: 10,
        returns: 2,
        title: "",
      },
    },
  },
];

describe("ProductGroupTable", () => {
  test("renders without crashing", () => {
    expect(
      render(<ProductGroupTable groupedData={mockGroupedData} />).container
    ).toMatchSnapshot();
  });

  test("renders table headers", () => {
    render(<ProductGroupTable groupedData={mockGroupedData} />);
    const groupHeader = screen.getByTestId("group-header");
    const ordersHeader = screen.getByTestId("order-header");
    const returnsHeader = screen.getByTestId("return-header");
    expect(groupHeader).toBeInTheDocument();
    expect(ordersHeader).toBeInTheDocument();
    expect(returnsHeader).toBeInTheDocument();
  });

  test("sorts data correctly by group", () => {
    render(<ProductGroupTable groupedData={mockGroupedData} />);
    const groupHeader = screen.getByTestId("group-header");
    fireEvent.click(groupHeader);
    const firstRow = screen.getAllByRole("row")[1];
    expect(firstRow.children.item(1)).toHaveTextContent("Group B");
    fireEvent.click(groupHeader);
    const secondRow = screen.getAllByRole("row")[1];
    expect(secondRow.children.item(1)).toHaveTextContent("Group A");
  });

  test("sorts data correctly by orders", () => {
    render(<ProductGroupTable groupedData={mockGroupedData} />);
    const ordersHeader = screen.getByTestId("order-header");
    fireEvent.click(ordersHeader);
    const firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("Group A");
    fireEvent.click(ordersHeader);
    const secondRow = screen.getAllByRole("row")[1];
    expect(secondRow).toHaveTextContent("Group B");
  });

  test("expands and collapses row on click", () => {
    render(<ProductGroupTable groupedData={mockGroupedData} />);
    const firstRow = screen.getAllByRole("row")[1];
    fireEvent.click(firstRow);
    const expandedRow = screen.getByText(/sku1/i);
    expect(expandedRow).toBeInTheDocument();
  });
});
