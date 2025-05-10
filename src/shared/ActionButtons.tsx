import { SellOutlined, Shop2Outlined } from "@mui/icons-material";
import { IconButton, Link } from "@mui/material";
import React from "react";

export const ViewFlipkartListingButton: React.FC<{
  flipkartSerialNumber: string;
}> = ({ flipkartSerialNumber }) =>
    flipkartSerialNumber && (
      <Link
        title="View Flipkart Listing"
        href={`https://www.flipkart.com/product/p/itme?pid=${flipkartSerialNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`view-flipkart-${flipkartSerialNumber}`}
      >
        <IconButton size="small">
          <Shop2Outlined />
        </IconButton>
      </Link>
    );

export const ViewAmazonListingButton: React.FC<{
  amazonSerialNumber: string;
}> = ({ amazonSerialNumber }) =>
    amazonSerialNumber && (
      <Link
        title="View Amazon Listing"
        href={`https://www.amazon.in/sacred/dp/${amazonSerialNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`view-flipkart-${amazonSerialNumber}`}
      >
        <IconButton size="small">
          <Shop2Outlined />
        </IconButton>
      </Link>
    );

export const ShowProductEditPageButton: React.FC<{
  sku: string;
}> = ({ sku }) => (
  <Link
    title="Show Product Edit Page"
    target="_blank"
    rel="noopener noreferrer"
    href={`https://seller.flipkart.com/index.html#dashboard/listings-management?listingState=ACTIVE&listingsSearchQuery=${sku}&partnerContext=ALL`}
  >
    <IconButton size="small">
      <SellOutlined />
    </IconButton>
  </Link>
);
