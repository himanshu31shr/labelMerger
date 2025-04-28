import React from "react";

const FormattedCurrency: React.FC<{ value: number }> = ({
  value,
}: {
  value: number;
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return <span>{formatter.format(value)}</span>;
};

export { FormattedCurrency };
