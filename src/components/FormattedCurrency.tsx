import React from "react";

interface FormattedCurrencyProps {
  value: number;
  color?: string;
}

const FormattedCurrency: React.FC<FormattedCurrencyProps> = ({
  value,
  color,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return <span style={{ color: color ?? "inherit" }}>{formatter.format(value)}</span>;
};

export { FormattedCurrency };
