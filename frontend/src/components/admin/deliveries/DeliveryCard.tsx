import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Sale } from '../../../types';
import DeliveryTracker from './DeliveryTracker';

interface DeliveryCardProps {
    delivery: Sale;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery }) => {
    return (
        <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6">{delivery.productName}</Typography>
            <Typography color="text.secondary" gutterBottom>Cliente: {delivery.customerName}</Typography>
            <Box sx={{ my: 2 }}>
                <Typography variant="body2">Vendedor: {delivery.sellerName}</Typography>
                <Typography variant="body2">Entregador: {delivery.delivererName}</Typography>
            </Box>
            <DeliveryTracker sale={delivery} />
        </Paper>
    );
};

export default DeliveryCard;
