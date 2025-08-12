import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductTable from '../components/admin/products/ProductTable';
import { useApp } from '../context/AppContext';

const DashboardPage: React.FC = () => {
  const { isDemoRunning, startDemo, stopDemo, isAutoDemoRunning, startAutoDemo, stopAutoDemo } = useApp();

  return (
    <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" gutterBottom>
                Painel Administrativo
            </Typography>
            <Box>
                {!isDemoRunning ? (
                    <Button variant="contained" color="success" onClick={startDemo} sx={{ mr: 2 }}>
                        Iniciar Demonstração
                    </Button>
                ) : (
                    <Button variant="outlined" color="error" onClick={stopDemo} sx={{ mr: 2 }}>
                        Parar Demonstração
                    </Button>
                )}
                {!isAutoDemoRunning ? (
                    <Button variant="contained" color="secondary" onClick={startAutoDemo} sx={{ mr: 2 }}>
                        Iniciar Demo Automática
                    </Button>
                ) : (
                    <Button variant="outlined" color="error" onClick={stopAutoDemo} sx={{ mr: 2 }}>
                        Parar Demo Automática
                    </Button>
                )}
                <Button variant="contained" component={Link} to="/products/new">
                    Adicionar Produto
                </Button>
            </Box>
        </Box>
        {/* Aqui viriam os cards de métricas */}

        <Typography variant="h5" sx={{mt: 4}} gutterBottom>
            Produtos em Estoque
        </Typography>
        <ProductTable />
    </Box>
  );
};

export default DashboardPage;
