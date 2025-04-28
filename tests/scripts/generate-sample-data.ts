import * as XLSX from 'xlsx';

// Generate Amazon sample data
const amazonProducts = [
  {
    'sku': 'A-SKU-001',
    'description': 'Amazon Test Product 1',
    'type': 'order',
    'quantity': '1',
    'product sales': '500',
    'shipping credits': '50',
    'promotional rebates': '0',
    'selling fees': '-25',
    'fba fees': '-50',
    'other': '0',
    'total': '475'
  },
  {
    'sku': 'A-SKU-002',
    'description': 'Amazon Test Product 2',
    'type': 'order',
    'quantity': '2',
    'product sales': '1000',
    'shipping credits': '100',
    'promotional rebates': '0',
    'selling fees': '-50',
    'fba fees': '-100',
    'other': '0',
    'total': '950'
  }
];

// Generate Flipkart sample data
const flipkartProducts = [
  {
    'SKU ID': 'F-SKU-001',
    'Product Name': 'Flipkart Test Product 1',
    'Base Price': '400',
    'Cost Price': '300',
    'Net Units (#)': '1'
  },
  {
    'SKU ID': 'F-SKU-002',
    'Product Name': 'Flipkart Test Product 2',
    'Base Price': '800',
    'Cost Price': '600',
    'Net Units (#)': '2'
  }
];

// Create workbooks
const amazonWorkbook = XLSX.utils.book_new();
const flipkartWorkbook = XLSX.utils.book_new();

// Create worksheets
const amazonWorksheet = XLSX.utils.json_to_sheet(amazonProducts);
const flipkartWorksheet = XLSX.utils.json_to_sheet(flipkartProducts);

// Add worksheets to workbooks
XLSX.utils.book_append_sheet(amazonWorkbook, amazonWorksheet, 'Products');
XLSX.utils.book_append_sheet(flipkartWorkbook, flipkartWorksheet, 'Products');

// Write files
XLSX.writeFile(amazonWorkbook, 'tests/data/amazon-sample-products.xlsx');
XLSX.writeFile(flipkartWorkbook, 'tests/data/flipkart-sample-products.xlsx');