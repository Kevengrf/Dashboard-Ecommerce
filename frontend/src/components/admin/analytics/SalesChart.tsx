import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Sale, User } from '../../../types';

interface SalesChartProps {
    salesData: { name: string; "Vendas (R$)": number; "Qtd. Vendas": number; }[];
}

const SalesChart: React.FC<SalesChartProps> = ({ salesData }) => {
    const theme = useTheme();

    return (
        <Paper sx={{ p: 3, borderRadius: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>Ranking de Vendas por Vendedor (Mês)</Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={salesData}
                    margin={{ top: 5, right: 20, left: -10, bottom: 40 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.text.secondary} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: theme.palette.background.paper, 
                            borderColor: theme.palette.primary.main 
                        }}
                    />
                    <Legend />
                    <Bar dataKey="Vendas (R$)" fill={theme.palette.primary.main} />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default SalesChart;
