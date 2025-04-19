import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  getOrders,
  deleteDatabase,
  saveOrders,
  getOrderById,
} from "../../../src/storage/db";
import { OrderItem } from "../../../src/pages/orderAnalytics/types/order.type";
import { OrderAnalyticsPage } from "../../../src/pages/orderAnalytics/orderAnalytics.page";
import Papa from "papaparse";
import { MemoryRouter } from "react-router-dom";

// Mock the getOrders and deleteDatabase functions
jest.mock("../../../src/storage/db", () => ({
  getOrders: jest.fn(),
  deleteDatabase: jest.fn(),
  saveOrders: jest.fn(),
  getOrderById: jest.fn(),
}));

jest.mock("papaparse", () => ({
  parse: jest.fn(),
}));

const mockOrders: OrderItem[] = [
  {
    order_id: "1",
    sku: "SSPS001005",
    product_title: "Product 1",
    order_item_status: "Success",
    quantity: "1",
    order_date: "2023-01-01",
    order_item_id: "",
    fulfilment_source: "",
    fulfilment_type: "",
    order_approval_date: "",
    fsn: "",
    serial_no_imei: "",
    delivery_logistics_partner: "",
    pickup_logistics_partner: "",
    delivery_tracking_id: "",
    forward_logistics_form: "",
    forward_logistics_form_no: "",
    order_cancellation_date: "",
    cancellation_reason: "",
    cancellation_sub_reason: "",
    order_return_approval_date: "",
    return_id: "",
    return_reason: "",
    return_sub_reason: "",
    procurement_dispatch_sla: "",
    dispatch_after_date: "",
    dispatch_by_date: "",
    order_ready_for_dispatch_on_date: "",
    dispatched_date: "",
    dispatch_sla_breached: "",
    seller_pickup_reattempts: "",
    delivery_sla: "",
    deliver_by_date: "",
    order_delivery_date: "",
    delivery_sla_breached: "",
    order_service_completion_date: "",
    service_by_date: "",
    service_completion_sla: "",
    service_sla_breached: "",
  },
  {
    order_id: "2",
    sku: "SSPS002005",
    product_title: "Product 2",
    order_item_status: "Return",
    quantity: "2",
    order_date: "2023-01-02",
    order_item_id: "",
    fulfilment_source: "",
    fulfilment_type: "",
    order_approval_date: "",
    fsn: "",
    serial_no_imei: "",
    delivery_logistics_partner: "",
    pickup_logistics_partner: "",
    delivery_tracking_id: "",
    forward_logistics_form: "",
    forward_logistics_form_no: "",
    order_cancellation_date: "",
    cancellation_reason: "",
    cancellation_sub_reason: "",
    order_return_approval_date: "",
    return_id: "",
    return_reason: "",
    return_sub_reason: "",
    procurement_dispatch_sla: "",
    dispatch_after_date: "",
    dispatch_by_date: "",
    order_ready_for_dispatch_on_date: "",
    dispatched_date: "",
    dispatch_sla_breached: "",
    seller_pickup_reattempts: "",
    delivery_sla: "",
    deliver_by_date: "",
    order_delivery_date: "",
    delivery_sla_breached: "",
    order_service_completion_date: "",
    service_by_date: "",
    service_completion_sla: "",
    service_sla_breached: "",
  },
];

describe("OrderAnalyticsPage", () => {
  beforeEach(() => {
    (getOrders as jest.Mock).mockResolvedValue(mockOrders);
    (saveOrders as jest.Mock).mockResolvedValue(mockOrders);
    (getOrderById as jest.Mock).mockResolvedValue(mockOrders);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<OrderAnalyticsPage />);
    expect(
      render(<OrderAnalyticsPage />).container
    ).toMatchSnapshot();
  });

  test("renders file input", () => {
    render(<OrderAnalyticsPage />);
    const fileInput = screen.getByLabelText(/flipkart report/i);
    expect(fileInput).toBeInTheDocument();
  });

  test("displays loader when fetching data", async () => {
    render(<OrderAnalyticsPage />);
    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
    await waitFor(() => expect(loader).not.toBeInTheDocument());
  });

  test("displays data after fetching", async () => {
    render(<OrderAnalyticsPage />);
    await waitFor(() => {
      const product1 = screen.getByText(/BHOG THALI/i);
      expect(product1).toBeInTheDocument();
    });
  });

  test("delete button works correctly", async () => {
    render(<OrderAnalyticsPage />);
    const deleteButton = screen.getByTestId("delete-data");
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(deleteDatabase).toHaveBeenCalled();
      const product1 = screen.queryByText(/BHOG THALI/i);
      expect(product1).not.toBeInTheDocument();
    });
  });

  test("handleFileUpload processes file correctly", async () => {
    render(
      <MemoryRouter>
        <OrderAnalyticsPage />
      </MemoryRouter>
    );

    // Wait for data to load
    await screen.findByText(/Flipkart Report/);

    const file = new File(
      [
        `sku,orderDate,quantity,price
        sku1,2023-01-01,1,100
        sku2,2023-01-02,2,200`,
      ],
      "test.csv",
      { type: "text/csv" }
    );

    const input = screen.getByLabelText(/Flipkart Report/);
    fireEvent.change(input, { target: { files: [file] } });

    expect(Papa.parse).toHaveBeenCalled();
  });
});
