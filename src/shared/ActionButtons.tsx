import { IconButton, Link } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export const ViewFlipkartListingButton: React.FC<{
  flipkartSerialNumber: string;
}> = ({ flipkartSerialNumber }) =>
  flipkartSerialNumber && (
    <Link
      href={`https://www.flipkart.com/product/p/itme?pid=${flipkartSerialNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`view-flipkart-${flipkartSerialNumber}`}
    >
      <IconButton size="small">
        <RemoveRedEyeIcon />
      </IconButton>
    </Link>
  );

export const ViewAmazonListingButton: React.FC<{
  amazonSerialNumber: string;
}> = ({ amazonSerialNumber }) =>
  amazonSerialNumber && (
    <Link
      href={`https://www.amazon.in/sacred/dp/${amazonSerialNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`view-flipkart-${amazonSerialNumber}`}
    >
      <IconButton size="small">
        <RemoveRedEyeIcon />
      </IconButton>
    </Link>
  );
