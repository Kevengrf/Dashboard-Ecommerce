import React from 'react';
import { Box, Typography } from '@mui/material';
import LeadsTable from '../components/admin/leads/LeadsTable';

const LeadsPage: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Leads Recebidos (Chat)
            </Typography>
            <LeadsTable />
        </Box>
    );
};

export default LeadsPage;
