export interface FlipkartOrderData {
    "Order ID": string;
    "Order Date": string;
    "SKU": string;
    "SKU Name": string;
    "Gross Units": number;
    "Accounted Net Sales (INR)": string | number;
    "Bank Settlement [Projected] (INR)": string | number;
    "Order Status": string;
    "Total Expenses (INR)": string | number;
    "Type": string;
    "Description"?: string;
    "Total": string | number;
    "Product Sales"?: string | number;
    "Selling Fees"?: string | number;
    "FBA Fees"?: string | number;
    "Other Transaction Fees"?: string | number;
    "Other"?: string | number;
    "Final Selling Price (incl. seller opted in default offers)"?: string | number;
    "Net Earnings (INR)"?: string | number;
  }
  
  export interface FlipkartSkuData {
    "SKU ID": string;
    "Product Name": string;
    "Base Price": string | number;
    "Cost Price": string | number;
    "Net Units (#)": string | number;
  }
  
  export interface AmazonCsvData {
    "date/time": string;
    "settlement id": string;
    "type": string;
    "order id": string;
    "Sku"?: string;
    "sku"?: string;
    "description": string;
    "quantity": string;
    "account type": string;
    "fulfillment": string;
    "order city": string;
    "order state": string;
    "order postal": string;
    "product sales": string;
    "shipping credits": string;
    "gift wrap credits": string;
    "promotional rebates": string;
    "Total sales tax liable(GST before adjusting TCS)": string;
    "TCS-CGST": string;
    "TCS-SGST": string;
    "TCS-IGST": string;
    "TDS (Section 194-O)": string;
    "selling fees": string;
    "fba fees": string;
    "other transaction fees": string;
    "other": string;
    "total": string;
  }