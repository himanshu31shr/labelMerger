import React from 'react';
import { Container, Paper, Box, Typography, Card, CardContent } from '@mui/material';
import CategoryList from './CategoryList';

export const CategoriesPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Category Management
          </Typography>
        </Box>
        <CategoryList />
      </Paper>
    </Container>
  );
};

export default CategoriesPage;
