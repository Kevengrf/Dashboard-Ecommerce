import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { motion } from 'framer-motion';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sale } from '../../types';

const steps: Sale['deliveryStatus'][] = ['Pedido Recebido', 'A Caminho', 'Entregue'];

const DeliveryStatusPage: React.FC = () => {
  const { id } = useParams();
  const { sales, updateDeliveryStatus } = useApp();
  const delivery = sales.find(s => s.id === parseInt(id || ''));

  if (!delivery) {
    return <Typography variant="h4">Entrega não encontrada!</Typography>;
  }

  const activeStep = steps.indexOf(delivery.deliveryStatus);

  const handleNext = () => {
    const nextStepIndex = Math.min(activeStep + 1, steps.length - 1);
    updateDeliveryStatus(delivery.id, steps[nextStepIndex]);
  };

  const handleBack = () => {
    const prevStepIndex = Math.max(activeStep - 1, 0);
    updateDeliveryStatus(delivery.id, steps[prevStepIndex]);
  };

  return (
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        bgcolor: 'background.default', 
        p: 3 
    }}>
      <Paper sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="primary">Acompanhe sua Entrega</Typography>
        <Typography variant="body1" color="text.secondary" mb={5}>Cliente: Keven William | Pedido: #12345</Typography>

        <Box sx={{ width: '100%', position: 'relative', height: 80 }}>
            <motion.div
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
                animate={{
                    left: `${(activeStep / (steps.length - 1)) * 90}%`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <TwoWheelerIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            </motion.div>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ position: 'relative', top: 40}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>

        <Box sx={{ mt: 6 }}>
            <Typography variant="h6">Status: {steps[activeStep]}</Typography>
        </Box>

        {/* Botões para simular a mudança de status */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button onClick={handleBack} disabled={activeStep === 0}>Voltar Etapa</Button>
            <Button variant="contained" onClick={handleNext} disabled={activeStep === steps.length - 1}>Avançar Etapa</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DeliveryStatusPage;
