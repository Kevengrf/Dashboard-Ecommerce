import React, { useState } from 'react';
import { Box, Typography, Grid, Button, ButtonGroup } from '@mui/material';
import { useApp } from '../../context/AppContext';
import DeliveryCard from '../../components/admin/deliveries/DeliveryCard';
import { Sale } from '../../types';

const DeliveriesPage: React.FC = () => {
    const { sales } = useApp();
    const [view, setView] = useState('Live');

    const filteredDeliveries = sales.filter((s: Sale) => {
        if (view === 'Live') {
            return !s.isComplete;
        }
        return s.isComplete;
    });

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Entregas
                </Typography>
                <ButtonGroup variant="contained">
                    <Button onClick={() => setView('Live')} disabled={view === 'Live'}>Ativas</Button>
                    <Button onClick={() => setView('History')} disabled={view === 'History'}>Histórico</Button>
                </ButtonGroup>
            </Box>
            {filteredDeliveries.length === 0 ? (
                <Typography>Nenhuma entrega para exibir.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredDeliveries.map((delivery: Sale) => (
                        <Grid item xs={12} md={6} lg={4} key={delivery.id}>
                            <DeliveryCard delivery={delivery} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default DeliveriesPage;
