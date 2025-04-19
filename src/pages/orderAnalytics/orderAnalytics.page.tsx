import CloseIcon from "@mui/icons-material/Delete";
import { Alert, Box, CircularProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { deleteDatabase, getOrders } from "../../storage/db";
import { FileInput } from "../home/file-input";
import { ProductGroupTable } from "./ProductGroupTable";
import { OrderAggregationService } from "./services/orderAggregation.service";
import { Group } from "./types/group.type";
import { OrderItem } from "./types/order.type";

export const OrderAnalyticsPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [groupedData, setGroupedData] = useState<Group[]>([]);
  const [timeline, setTimeLine] = useState<
    Partial<{ start: string; end: string }>
  >({});

  const [fetchingDb, setFetchingDb] = useState(false);

  const fetchOrders = async () => {
    setFetchingDb(true);
    const savedOrders = await getOrders();
    if (savedOrders.length > 0) {
      setOrderItems(savedOrders);
      const service = new OrderAggregationService(savedOrders as OrderItem[]);
      setGroupedData(await service.process());
      setTimeLine(service.getDates());
    }
    setFetchingDb(false);
  };

  const deleteDb = () => {
    setFetchingDb(true);
    deleteDatabase();
    setOrderItems([]);
    setGroupedData([]);
    setTimeLine({});
    setFetchingDb(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFetchingDb(true);
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: async (results: Papa.ParseResult<OrderItem>) => {
          const data = results.data as OrderItem[];
          setOrderItems(data);
          const service = new OrderAggregationService(data);
          setGroupedData(await service.process());
          setTimeLine(service.getDates());
          setFetchingDb(false);
        },
        header: true,
        transform: (value: string, field: string) => {
          if (field === "sku") {
            value = value.replaceAll(/["]|sku:/gi, "");
          }

          return value;
        },
        skipEmptyLines: true,
      });
    }
  };

  return (
    <Loader showLoader={fetchingDb}>
      <Grid
        container
        spacing={2}
        justifyContent={"space-between"}
        marginTop={2}
        marginBottom={2}
      >
        <Box>
          <FileInput
            onChange={handleFileUpload}
            name="Flipkart Report"
            accepts=".csv"
            selected={orderItems == null}
          />
        </Box>
        <Box>
          <IconButton onClick={() => deleteDb()} data-testid="delete-data">
            <CloseIcon />{" "}
          </IconButton>
        </Box>
        <Grid size={12}>
          {timeline.start && timeline.end && (
            <Alert color="info">
              Showing data between {new Date(timeline.start).toDateString()} &{" "}
              {new Date(timeline.end).toDateString()}
            </Alert>
          )}
        </Grid>
      </Grid>
      {groupedData.length > 0 && (
        <ProductGroupTable
          groupedData={groupedData}
        />
      )}
    </Loader>
  );
};

const Loader = ({
  showLoader = false,
  children,
}: {
  showLoader: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      {showLoader && (
        <Grid spacing={10} marginTop={2} alignItems={"center"}>
          <CircularProgress size={16} />{" "}Building data...
        </Grid>
      )}
      {children}
    </>
  );
};
