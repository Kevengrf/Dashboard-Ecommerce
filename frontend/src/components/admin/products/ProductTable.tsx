import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useApp } from '../../../context/AppContext';
import { Product } from '../../../types';

const ProductTable: React.FC = () => {
  const { products } = useApp();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Condição</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Estoque</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row: Product) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.category || 'N/A'}</TableCell>
              <TableCell>{row.condition || 'N/A'}</TableCell>
              <TableCell>{`R$ ${row.price}`}</TableCell>
              <TableCell>{row.stock_quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
