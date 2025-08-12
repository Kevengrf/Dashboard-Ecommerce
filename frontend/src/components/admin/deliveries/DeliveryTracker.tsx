import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Icon } from '@mui/material';
import { motion } from 'framer-motion';
import { Sale } from '../../types';

const steps: Sale['deliveryStatus'][] = ['Pedido Recebido', 'A Caminho', 'Entregue'];

const DeliveryTracker: React.FC<{ sale: Sale }> = ({ sale }) => {
    const activeStep = steps.indexOf(sale.deliveryStatus);

    return (
        <Box sx={{ width: '100%', position: 'relative', mt: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ position: 'relative', width: '100%', height: 40 }}>
                <motion.div
                    initial={{ left: '0%' }}
                    animate={{ left: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: 0, display: 'flex', alignItems: 'center' }}
                >
                    <Icon sx={{ fontSize: 40, color: 'primary.main' }}>motorcycle</Icon>
                </motion.div>
            </Box>
        </Box>
    );
};

export default DeliveryTracker;
