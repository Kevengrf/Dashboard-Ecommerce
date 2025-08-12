import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, Box } from '@mui/material';
import { useApp } from '../../../context/AppContext';
import { Lead, Product } from '../../../types';

const statusColors: { [key: string]: "primary" | "secondary" | "success" | "error" | "default" } = {
    'Novo': 'primary',
    'Em Atendimento': 'secondary',
    'Vendido': 'success',
    'Cancelado': 'error',
};

const LeadsTable: React.FC = () => {
  const { leads, products, attendLead, convertToSale, isDemoRunning } = useApp();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="leads table">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Contato</TableCell>
            <TableCell>Produto de Interesse</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((row: Lead) => {
            const product = products.find((p: Product) => p.id === row.productId);
            return (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{product ? product.name : 'Produto não encontrado'}</TableCell>
                  <TableCell><Chip label={row.status} color={statusColors[row.status] || 'default'} /></TableCell>
                  <TableCell align="center">
                    {row.status === 'Novo' && 
                        <Button variant="outlined" size="small" onClick={() => attendLead(row.id)} disabled={isDemoRunning}>Atender</Button>}
                    {row.status === 'Em Atendimento' && 
                        <Button variant="contained" size="small" color="primary" onClick={() => convertToSale(row.id)} disabled={isDemoRunning}>Concluir Venda</Button>}
                  </TableCell>
                </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeadsTable;
