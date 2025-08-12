import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Sidebar from './components/admin/Sidebar';
import AnimatedRoutes from './AnimatedRoutes';

// Páginas
import DeliveryStatusPage from './pages/deliveries/DeliveryStatusPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          {/* A tela de tracking não terá a sidebar, então fica fora do Box principal */}
          <Routes>
            <Route path="/delivery-tracking/:id" element={<DeliveryStatusPage />} />
            
            {/* Rota principal com a sidebar */}
            <Route path="/*" element={
              <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <AnimatedRoutes />
                </Box>
              </Box>
            } />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;