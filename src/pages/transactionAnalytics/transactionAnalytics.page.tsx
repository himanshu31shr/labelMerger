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
} from "@mui/material";
import Papa from "papaparse";
import {
  Transaction,
  ProductPrice,
  TransactionSummary,
} from "../../types/transaction.type";
import { TransactionAnalysisService } from "../../services/transactionAnalysis.service";
import { PriceManagementModal } from "../../components/PriceManagementModal/PriceManagementModal";
import { DEFAULT_PRODUCT_PRICES } from "../../constants/defaultPrices";

export const TransactionAnalytics: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [productPrices, setProductPrices] = useState<ProductPrice[]>(
    DEFAULT_PRODUCT_PRICES.map((p) => ({
      sku: p.sku,
      description: p.description,
      costPrice: p.costPrice,
      basePrice: p.costPrice,
    }))
  );
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const availableProducts = useMemo(() => {
    if (!transactions.length) return [];
    const uniqueProducts = new Map<
      string,
      { sku: string; description: string }
    >();
    transactions.forEach((transaction) => {
      if (transaction.sku && transaction.type.toLowerCase() === "order") {
        uniqueProducts.set(transaction.sku, {
          sku: transaction.sku,
          description: transaction.description,
        });
      }
    });
    return Array.from(uniqueProducts.values());
  }, [transactions]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const data = (results.data as any[])
            .filter((row) => row && typeof row === "object")
            .filter((row) => !row.type?.toLowerCase().includes("definition"))
            .map((row) => ({
              date: row["date/time"],
              settlementId: row["settlement id"],
              type: row["type"],
              orderId: row["order id"],
              sku: row["Sku"] || row["sku"],
              description: row["description"],
              quantity: row["quantity"],
              marketplace: row["marketplace"],
              accountType: row["account type"],
              fulfillment: row["fulfillment"],
              orderCity: row["order city"],
              orderState: row["order state"],
              orderPostal: row["order postal"],
              productSales: row["product sales"],
              shippingCredits: row["shipping credits"],
              giftWrapCredits: row["gift wrap credits"],
              promotionalRebates: row["promotional rebates"],
              totalSalesTaxLiable:
                row["Total sales tax liable(GST before adjusting TCS)"],
              tcsCgst: row["TCS-CGST"],
              tcsSgst: row["TCS-SGST"],
              tcsIgst: row["TCS-IGST"],
              tds: row["TDS (Section 194-O)"],
              sellingFees: row["selling fees"],
              fbaFees: row["fba fees"],
              otherTransactionFees: row["other transaction fees"],
              other: row["other"],
              total: row["total"],
            })) as Transaction[];

          setTransactions(data);
          const service = new TransactionAnalysisService(data, productPrices);
          setSummary(service.analyze());
          setLoading(false);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handlePricesSave = (newPrices: ProductPrice[]) => {
    setProductPrices(newPrices);
    if (transactions.length > 0) {
      const service = new TransactionAnalysisService(transactions, newPrices);
      setSummary(service.analyze());
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Transaction Analytics
              </Typography>
              <Button variant="contained" component="label" sx={{ mr: 2 }}>
                Upload Transactions
                <input
                  type="file"
                  hidden
                  accept=".csv"
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
            </Box>

            {loading ? (
              <Typography>Loading...</Typography>
            ) : summary ? (
              <>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">Total Sales</Typography>
                      <Typography variant="h4">
                        ₹{summary.totalSales.toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">Total Units</Typography>
                      <Typography variant="h4">
                        {summary.totalUnits}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">Total Expenses</Typography>
                      <Typography variant="h4">
                        ₹{summary.totalExpenses.toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="h6">Total Profit</Typography>
                      <Typography variant="h4">
                        ₹{summary.totalProfit.toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>
                  Expenses by Category
                </Typography>
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(summary.expensesByCategory).map(
                        ([category, amount]) => (
                          <TableRow key={category}>
                            <TableCell>{category}</TableCell>
                            <TableCell align="right">
                              ₹{amount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="h6" gutterBottom>
                  Sales by Product
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>SKU</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Units</TableCell>
                        <TableCell align="right">Cost Price</TableCell>
                        <TableCell align="right">Total Cost</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(summary.salesByProduct).map(
                        ([sku, data]) => {
                          const price = productPrices.find(
                            (p) => p.sku === sku
                          );
                          const totalCost =
                            (price?.costPrice || 0) * data.units;
                          return (
                            <TableRow key={sku}>
                              <TableCell>{sku}</TableCell>
                              <TableCell>{data.description}</TableCell>
                              <TableCell align="right">{data.units}</TableCell>
                              <TableCell align="right">
                                ₹{(price?.costPrice || 0).toFixed(2)}
                              </TableCell>
                              <TableCell align="right">₹{totalCost}</TableCell>
                            </TableRow>
                          );
                        }
                      )}
                      <TableRow>
                        <TableCell colSpan={2} align="right">
                          <strong>Total</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>
                            {summary.totalUnits}
                            {/* {Object.entries(summary.salesByProduct)
                              .map(([, data]) => data.units)
                              .reduce((prev, next) => prev + next, 0)} */}
                          </strong>
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">
                          <strong>
                            ₹{summary.totalCost}
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Typography>
                Upload a transaction file to see analytics
              </Typography>
            )}
          </Paper>
        </Grid>
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
