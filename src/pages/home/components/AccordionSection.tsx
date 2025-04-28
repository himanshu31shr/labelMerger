import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionSectionProps {
  title: string;
  isExpanded: boolean;
  onChange: (isExpanded: boolean) => void;
  children: React.ReactNode;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  isExpanded,
  onChange,
  children,
}) => {
  return (
    <Accordion 
      expanded={isExpanded}
      onChange={(_, expanded) => onChange(expanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};