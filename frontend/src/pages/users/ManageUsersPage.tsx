import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import UserForm from '../../components/admin/users/UserForm';
import { User } from '../../types';
import { useApp } from '../../context/AppContext';

const ManageUsersPage: React.FC = () => {
    const location = useLocation();
    const role: 'vendedor' | 'entregador' = location.pathname.includes('sellers') ? 'vendedor' : 'entregador';
    const { users } = useApp();

    const filteredUsers = users.filter((user: User) => user.role === role);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Gestão de {role === 'vendedor' ? 'Vendedores' : 'Entregadores'}
            </Typography>
            <UserForm userRole={role} />
            {/* Aqui entrará a tabela de usuários cadastrados */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Lista de {role === 'vendedor' ? 'Vendedores' : 'Entregadores'}</Typography>
            {/* Tabela de usuários - simplificada para a demo */}
            <Paper sx={{ p: 2, borderRadius: 2 }}>
                {filteredUsers.length === 0 ? (
                    <Typography>Nenhum {role} cadastrado.</Typography>
                ) : (
                    <Box>
                        {filteredUsers.map((user: User) => (
                            <Typography key={user.id}>{user.name} ({user.email})</Typography>
                        ))}
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ManageUsersPage;
