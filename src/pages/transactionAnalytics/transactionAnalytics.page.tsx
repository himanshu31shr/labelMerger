import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { PriceManagementModal } from "../../components/PriceManagementModal/PriceManagementModal";
import { DEFAULT_PRODUCT_PRICES } from "../../constants/defaultPrices";
import { TransactionAnalysisService } from "../../services/transactionAnalysis.service";
import {
  ProductPrice,
  Transaction,
  TransactionSummary,
} from "../../types/transaction.type";
import OrderList from "./components/order-list.component";
import ProductList from "./components/product-list.component";
import SummaryTiles from "./components/summary-tiles.component";
import ReportExtractionFactory from "./services/ReportExtractionFactory";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

export const TransactionAnalytics: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [productPrices, setProductPrices] = useState<Map<string, ProductPrice>>(
    new Map(DEFAULT_PRODUCT_PRICES.map((p) => [p.sku, p]))
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
      if (transaction.sku) {
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const file = event.target.files?.[0];
      if (!file) throw new Error("No file selected");

      const { transactions: newTransactions, mappedPrices } =
        await new ReportExtractionFactory(file, productPrices).extract();

      const mergedTransactions = [...transactions, ...newTransactions];
      setTransactions(mergedTransactions);

      if (mappedPrices) {
        setProductPrices(mappedPrices);
      }

      const service = new TransactionAnalysisService(
        mergedTransactions,
        productPrices
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
    const updatedPrices = new Map(newPrices.map((p) => [p.sku, p]));
    if (transactions.length > 0) {
      const service = new TransactionAnalysisService(
        transactions,
        updatedPrices
      );
      setSummary(service.analyze());
    }
  };

  // const getMarketplaceSummary = (marketplace: "Amazon" | "Flipkart") => {
  //   const filteredTransactions = transactions.filter(
  //     (t) => t.marketplace === marketplace
  //   );
  //   if (filteredTransactions.length === 0) return null;

  //   const service = new TransactionAnalysisService(
  //     filteredTransactions,
  //     productPrices
  //   );
  //   return service.analyze();
  // };

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
          <>
            <SummaryTiles summary={summary} />
            <Grid item xs={12}>
              <Paper>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Orders" />
                    <Tab label="Amazon" />
                    <Tab label="Flipkart" />
                    <Tab label="Product Details" />
                  </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0} key={'transactions'}>
                  <OrderList transactions={transactions} />
                </TabPanel>

                <TabPanel value={tabValue} index={1} key={'asad'}>
                  {/* {(() => {
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
                            <Typography variant="h6">
                              Amazon Expenses
                            </Typography>
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
                  })()} */}
                </TabPanel>

                <TabPanel value={tabValue} index={2} key={'34354'}>
                  {/* {(() => {
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
                            <Typography variant="h6">
                              Flipkart Profit
                            </Typography>
                            <Typography variant="h4">
                              ₹{flipkartSummary.totalProfit.toFixed(2)}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    ) : (
                      <Typography>No Flipkart transactions found</Typography>
                    );
                  })()} */}
                </TabPanel>

                <TabPanel value={tabValue} index={3} key={'product-list'}>
                  <ProductList
                    summary={summary}
                    productPrices={productPrices}
                  />
                </TabPanel>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>

      <PriceManagementModal
        open={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        onSave={handlePricesSave}
        initialPrices={Array.from(productPrices.values())}
        availableProducts={availableProducts}
      />
    </Container>
  );
};
