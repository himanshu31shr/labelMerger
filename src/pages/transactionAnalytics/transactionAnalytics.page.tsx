import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Product, ProductService } from "../../services/product.service";
import { TransactionService } from "../../services/transaction.service";
import { TransactionAnalysisService } from "../../services/transactionAnalysis.service";
import { Transaction, TransactionSummary } from "../../types/transaction.type";
import OrderList from "./components/order-list.component";
import ProductList from "./components/product-list.component";
import SummaryTiles from "./components/summary-tiles.component";
import ReportExtractionFactory from "./services/ReportExtractionFactory";
import { useNavigate } from "react-router-dom";

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
  const [productPrices, setProductPrices] = useState<Map<string, Product>>(
    new Map()
  );
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState<{
    minDate: Date | null;
    maxDate: Date | null;
  }>({
    minDate: null,
    maxDate: null,
  });
  const navigate = useNavigate();

  const transactionService = useMemo(() => new TransactionService(), []);
  const productService = useMemo(() => new ProductService(), []);

  useEffect(() => {
    // Load existing transactions and product prices on mount
    const loadData = async () => {
      setLoading(true);
      try {
        const [loadedTransactions, products] = await Promise.all([
          transactionService.getTransactions(),
          productService.getProducts(),
        ]);

        // Convert products to ProductPrice format and store in Map
        const priceMap = new Map<string, Product>();

        products.forEach((product) => {
          priceMap.set(product.sku.toLowerCase(), product);
        });

        const transactionsWithPrices = loadedTransactions.map(
          (transaction) => ({
            ...transaction,
            product: {
              ...transaction.product,
              ...priceMap.get(transaction.sku.toLowerCase()),
            },
          })
        );

        const dates = transactionsWithPrices.map(
          (transaction) => new Date(transaction.orderDate)
        );

        setDateRange({
          minDate: new Date(Math.min(...dates.map((date) => date.getTime()))),
          maxDate: new Date(Math.max(...dates.map((date) => date.getTime()))),
        });

        setTransactions(transactionsWithPrices);

        setProductPrices(priceMap);

        if (loadedTransactions.length > 0) {
          const service = new TransactionAnalysisService(
            transactionsWithPrices,
            priceMap
          );
          setSummary(service.analyze());
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [transactionService, productService]);

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

      const newTransactions = await new ReportExtractionFactory(file).extract();

      // Save new transactions to Firebase
      await transactionService.saveTransactions(newTransactions);

      // Get all transactions including the newly saved ones
      const allTransactions = await transactionService.getTransactions();
      setTransactions(allTransactions);

      const service = new TransactionAnalysisService(
        allTransactions,
        productPrices
      );

      setSummary(service.analyze());

      // Reset file input
      event.target.value = "";
    } catch (error) {
      console.error("Error processing file:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ mb: 4, maxWidth: "100%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6} md={6}>
          <Typography variant="h5" gutterBottom>
            Transactions between {dateRange.minDate?.toDateString()} to{" "}
            {dateRange.maxDate?.toDateString()}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          md={6}
          alignItems={"flex-end"}
          justifyContent={"flex-end"}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "end",
              justifyContent: "end",
            }}
          >
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
              onClick={() => navigate("/labelMerger/products")}
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
        </Grid>

        {error && (
          <Grid item xs={12} md={12} lg={12}>
            <Box>
              <Alert severity="error">{error}</Alert>
            </Box>
          </Grid>
        )}
        {summary && (
          <Grid item xs={12} md={12} lg={12}>
            <SummaryTiles summary={summary} />
            <Grid item xs={12} marginTop={4}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Orders" />
                  <Tab label="Product Details" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0} key="transactions">
                <OrderList transactions={transactions} />
              </TabPanel>

              <TabPanel value={tabValue} index={1} key="product-list">
                <ProductList summary={summary} productPrices={productPrices} />
              </TabPanel>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
