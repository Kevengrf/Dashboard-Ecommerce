import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleIcon from '@mui/icons-material/People';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import BarChartIcon from '@mui/icons-material/BarChart';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Leads', icon: <MarkunreadMailboxIcon />, path: '/leads' },
  { text: 'Cadastrar Produto', icon: <AddCircleIcon />, path: '/products/new' },
  { text: 'Vendedores', icon: <PeopleIcon />, path: '/users/sellers' },
  { text: 'Entregadores', icon: <PeopleIcon />, path: '/users/deliverers' },
    { text: 'Entregas', icon: <TwoWheelerIcon />, path: '/deliveries' },,
  { text: 'Análise de Vendas', icon: <BarChartIcon />, path: '/analytics/sales' },
];

const Sidebar: React.FC = () => (
  <Box sx={{ width: 260, height: '100vh', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h5" color="primary">Recimportados</Typography>
    </Box>
    <Divider />
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding component={Link} to={item.path} sx={{ color: 'text.primary', textDecoration: 'none' }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default Sidebar;
