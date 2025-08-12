import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import AddProductForm from '../components/admin/products/AddProductForm';

const AddProductPage: React.FC = () => {
  return (
    <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Cadastrar Novo Produto
            </Typography>
            <AddProductForm />
        </Box>
    </Container>
  );
};

export default AddProductPage;
