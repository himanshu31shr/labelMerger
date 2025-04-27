import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import {
  Transaction,
  ProductPrice,
  TransactionSummary,
} from "../../types/transaction.type";
import { TransactionAnalysisService } from "../../services/transactionAnalysis.service";
import { PriceManagementModal } from "../../components/PriceManagementModal/PriceManagementModal";
import { DEFAULT_PRODUCT_PRICES } from "../../constants/defaultPrices";

interface FlipkartOrderData {
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
}

interface FlipkartSkuData {
  "SKU": string;
  "Product Name": string;
  "Base Price": string | number;
  "Cost Price": string | number;
}

interface AmazonCsvData {
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const TransactionAnalytics: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [productPrices, setProductPrices] = useState<ProductPrice[]>(
    DEFAULT_PRODUCT_PRICES.map((p) => ({
      sku: p.sku,
      name: p.description || p.sku,
      description: p.description,
      costPrice: p.costPrice,
      basePrice: p.costPrice,
      updatedAt: new Date().toISOString()
    }))
  );
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const availableProducts = useMemo(() => {
    if (!transactions.length) return [];
    const uniqueProducts = new Map<
      string,
      { sku: string; description: string }
    >();
    transactions.forEach((transaction) => {
      if (transaction.sku && transaction.type?.toLowerCase() === "order") {
        if (!uniqueProducts.has(transaction.sku)) {
          uniqueProducts.set(transaction.sku, {
            sku: transaction.sku,
            description: transaction.description || transaction.sku,
          });
        }
      }
    });
    return Array.from(uniqueProducts.values());
  }, [transactions]);

  const processFlipkartExcel = async (
    file: File
  ): Promise<{
    transactions: Transaction[];
    prices: ProductPrice[];
  }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });

          const ordersSheet = workbook.Sheets["Orders P&L"];
          const skuSheet = workbook.Sheets["SKU-level P&L"];

          if (!ordersSheet) {
            throw new Error("Required sheet 'Orders P&L' not found");
          }

          const ordersData = XLSX.utils.sheet_to_json<FlipkartOrderData>(ordersSheet);
          let skuData: FlipkartSkuData[] = [];

          if (skuSheet) {
            skuData = XLSX.utils.sheet_to_json<FlipkartSkuData>(skuSheet);
          }

          const transactions: Transaction[] = ordersData.map(order => ({
            transactionId: order["Order ID"],
            platform: 'flipkart',
            orderDate: order["Order Date"],
            sku: order["SKU"],
            quantity: Number(order["Gross Units"]),
            sellingPrice: Number(order["Accounted Net Sales (INR)"]),
            description: order["SKU Name"],
            type: order["Type"],
            marketplace: "Flipkart",
            orderStatus: order["Order Status"],
            total: order["Total"],
            productSales: order["Accounted Net Sales (INR)"],
            accNetSales: Number(order["Bank Settlement [Projected] (INR)"]),
            expenses: {
              shippingFee: 0,
              marketplaceFee: 0,
              otherFees: Number(order["Total Expenses (INR)"] || 0)
            },
            product: {
              name: order["SKU Name"] || order["SKU"],
              costPrice: 0,
              basePrice: 0
            },
            metadata: {
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          }));

          const prices: ProductPrice[] = skuData
            .filter((row) => row["SKU"] && (row["Base Price"] || row["Cost Price"]))
            .map((row) => ({
              sku: row["SKU"],
              name: row["Product Name"] || row["SKU"],
              description: row["Product Name"] || "",
              basePrice: parseFloat(String(row["Base Price"]).replace(/[₹,]/g, "")) || 0,
              costPrice: parseFloat(String(row["Cost Price"]).replace(/[₹,]/g, "")) || 0,
              updatedAt: new Date().toISOString()
            }));

          resolve({ transactions, prices });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsBinaryString(file);
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const file = event.target.files?.[0];
      if (!file) throw new Error("No file selected");

      let newTransactions: Transaction[] = [];
      let newPrices: ProductPrice[] = [...productPrices];

      if (file.name.endsWith(".xlsx")) {
        const { transactions, prices } = await processFlipkartExcel(file);
        newTransactions = transactions;

        const priceMap = new Map(newPrices.map((p) => [p.sku, p]));
        prices.forEach((p) => priceMap.set(p.sku, p));
        newPrices = Array.from(priceMap.values());
      } else if (file.name.endsWith(".csv")) {
        const results = await new Promise<Papa.ParseResult<unknown>>(
          (resolve) => {
            Papa.parse(file, {
              complete: resolve,
              header: true,
              skipEmptyLines: true,
            });
          }
        );

        newTransactions = (results.data as AmazonCsvData[])
          .filter((row) => row && typeof row === "object")
          .filter((row) => !row.type?.toLowerCase().includes("definition"))
          .map((row) => ({
            transactionId: row["order id"],
            platform: 'amazon',
            orderDate: row["date/time"],
            sku: row["Sku"] || row["sku"] || "",
            quantity: Number(row["quantity"]),
            sellingPrice: Number(row["product sales"].replace(/[₹,]/g, "")),
            description: row["description"],
            type: row["type"],
            marketplace: "Amazon",
            total: row["total"],
            productSales: row["product sales"],
            sellingFees: row["selling fees"],
            fbaFees: row["fba fees"],
            otherTransactionFees: row["other transaction fees"],
            other: row["other"],
            expenses: {
              shippingFee: Number(row["shipping credits"].replace(/[₹,]/g, "") || 0),
              marketplaceFee: Number(row["selling fees"].replace(/[₹,]/g, "") || 0),
              otherFees: Number(row["other transaction fees"].replace(/[₹,]/g, "") || 0)
            },
            product: {
              name: row["description"],
              costPrice: 0,
              basePrice: 0
            },
            metadata: {
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          }));
      } else {
        throw new Error(
          "Unsupported file format. Please upload a CSV or XLSX file."
        );
      }

      const mergedTransactions = [...transactions, ...newTransactions];
      setTransactions(mergedTransactions);
      setProductPrices(newPrices);

      const service = new TransactionAnalysisService(
        mergedTransactions,
        newPrices
      );
      setSummary(service.analyze());
    } catch (error) {
      console.error("Error processing file:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePricesSave = (newPrices: ProductPrice[]) => {
    setProductPrices(newPrices);
    if (transactions.length > 0) {
      const service = new TransactionAnalysisService(transactions, newPrices);
      setSummary(service.analyze());
    }
  };

  const getMarketplaceSummary = (marketplace: "Amazon" | "Flipkart") => {
    const filteredTransactions = transactions.filter(
      (t) => t.marketplace === marketplace
    );
    if (filteredTransactions.length === 0) return null;

    const service = new TransactionAnalysisService(
      filteredTransactions,
      productPrices
    );
    return service.analyze();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Transaction Analytics
            </Typography>
            <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
              <Button variant="contained" component="label" disabled={loading}>
                Upload File
                <input
                  type="file"
                  hidden
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                />
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsPriceModalOpen(true)}
                disabled={!availableProducts.length}
              >
                Manage Prices
              </Button>
              {loading && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  <Typography>Processing...</Typography>
                </Box>
              )}
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
          </Paper>
        </Grid>

        {summary && (
          <Grid item xs={12}>
            <Paper>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Combined Summary" />
                  <Tab label="Amazon" />
                  <Tab label="Flipkart" />
                  <Tab label="Product Details" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">Total Sales</Typography>
                      <Typography variant="h4">
                        ₹{summary.totalSales.toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">Total Expenses</Typography>
                      <Typography variant="h4">
                        ₹{summary.totalExpenses.toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">Total Units</Typography>
                      <Typography variant="h4">{summary.totalUnits}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">Total Profit</Typography>
                      <Typography variant="h4">
                        ₹{summary.totalProfit.toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                {(() => {
                  const amazonSummary = getMarketplaceSummary("Amazon");
                  return amazonSummary ? (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                          <Typography variant="h6">Amazon Sales</Typography>
                          <Typography variant="h4">
                            ₹{amazonSummary.totalSales.toFixed(2)}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                          <Typography variant="h6">Amazon Expenses</Typography>
                          <Typography variant="h4">
                            ₹{amazonSummary.totalExpenses.toFixed(2)}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                          <Typography variant="h6">Amazon Profit</Typography>
                          <Typography variant="h4">
                            ₹{amazonSummary.totalProfit.toFixed(2)}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography>No Amazon transactions found</Typography>
                  );
                })()}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                {(() => {
                  const flipkartSummary = getMarketplaceSummary("Flipkart");
                  return flipkartSummary ? (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                          <Typography variant="h6">Flipkart Sales</Typography>
                          <Typography variant="h4">
                            ₹{flipkartSummary.totalSales.toFixed(2)}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                          <Typography variant="h6">
                            Flipkart Expenses
                          </Typography>
                          <Typography variant="h4">
                            ₹{flipkartSummary.totalExpenses.toFixed(2)}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                          <Typography variant="h6">Flipkart Profit</Typography>
                          <Typography variant="h4">
                            ₹{flipkartSummary.totalProfit.toFixed(2)}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography>No Flipkart transactions found</Typography>
                  );
                })()}
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>SKU</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Units</TableCell>
                        <TableCell align="right">Sales</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">Profit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(summary.salesByProduct).map(
                        ([sku, data]) => (
                          <TableRow key={sku}>
                            <TableCell>{sku}</TableCell>
                            <TableCell>{data.description}</TableCell>
                            <TableCell align="right">{data.units}</TableCell>
                            <TableCell align="right">
                              ₹{data.amount.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              ₹
                              {(
                                (productPrices.find((p) => p.sku === sku)
                                  ?.costPrice || 0) * data.units
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              ₹{data.profit.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </Paper>
          </Grid>
        )}
      </Grid>

      <PriceManagementModal
        open={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        onSave={handlePricesSave}
        initialPrices={productPrices}
        availableProducts={availableProducts}
      />
    </Container>
  );
};
