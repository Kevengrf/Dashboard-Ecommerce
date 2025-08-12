import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import SalesChart from '../../components/admin/analytics/SalesChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import { useApp } from '../../context/AppContext';
import { generateSalesData } from '../../utils/mockData';
import { Sale, User } from '../../types';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 2, height: '100%' }}>
        {icon}
        <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{value}</Typography>
            <Typography color="text.secondary">{title}</Typography>
        </Box>
    </Paper>
);

const SalesAnalyticsPage: React.FC = () => {
    const { sales, users } = useApp();
    const salesData = generateSalesData(sales, users);

    const totalRevenue = salesData.reduce((acc, seller) => acc + seller["Vendas (R$)"], 0);
    const totalSalesCount = salesData.reduce((acc, seller) => acc + seller["Qtd. Vendas"], 0);
    const topSeller = [...salesData].sort((a, b) => b["Vendas (R$)"] - a["Vendas (R$)"])[0];

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Análise de Vendas</Typography>
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <MetricCard title="Faturamento Total" value={`R$ ${totalRevenue.toLocaleString('pt-BR')}`} icon={<MonetizationOnIcon color="primary" sx={{ fontSize: 40 }} />} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <MetricCard title="Vendas Realizadas" value={totalSalesCount} icon={<ShoppingCartIcon color="primary" sx={{ fontSize: 40 }} />} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <MetricCard title="Vendedor Destaque" value={topSeller ? topSeller.name : 'N/A'} icon={<GroupIcon color="primary" sx={{ fontSize: 40 }} />} />
                </Grid>
            </Grid>
            <SalesChart salesData={salesData} />
        </Box>
    );
};

export default SalesAnalyticsPage;
