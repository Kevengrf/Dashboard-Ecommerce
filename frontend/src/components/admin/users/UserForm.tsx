import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, MenuItem, Paper, Typography, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import { User } from '../../../types';
import { useApp } from '../../../context/AppContext';

interface UserFormProps {
    userRole: 'vendedor' | 'entregador';
}

const initialFormState: Omit<User, 'id' | 'password_hash'> = {
    name: '',
    email: '',
    role: 'vendedor',
    vehicle_model: '',
    license_plate: '',
    phone_number: '',
    photo_url: '',
};

const UserForm: React.FC<UserFormProps> = ({ userRole }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [password, setPassword] = useState('');
    const { users, setUsers } = useApp(); // Apenas para simulação de adição

    useEffect(() => {
        setFormData(prev => ({ ...prev, role: userRole }));
    }, [userRole]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = {
            id: users.length + 1,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            password_hash: password, // Em um app real, seria hashed no backend
            vehicle_model: formData.vehicle_model,
            license_plate: formData.license_plate,
            phone_number: formData.phone_number,
            photo_url: formData.photo_url,
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
        alert(`Usuário ${newUser.name} (${newUser.role}) cadastrado!`);
        setFormData(initialFormState);
        setPassword('');
    };

    return (
        <Paper component={motion.form} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, mb: 4 }} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid xs={12}>
                    <Typography variant="h5" component="h2" gutterBottom>Cadastrar Novo {userRole === 'vendedor' ? 'Vendedor' : 'Entregador'}</Typography>
                </Grid>
                <Grid xs={12} md={6}><TextField name="name" label="Nome Completo" fullWidth required onChange={handleChange} value={formData.name} /></Grid>
                <Grid xs={12} md={6}><TextField name="email" label="Email" type="email" fullWidth required onChange={handleChange} value={formData.email} /></Grid>
                <Grid xs={12} md={6}><TextField name="password" label="Senha" type="password" fullWidth required onChange={(e) => setPassword(e.target.value)} value={password} /></Grid>
                <Grid xs={12} md={6}><TextField name="phone_number" label="Contato (Telefone)" fullWidth onChange={handleChange} value={formData.phone_number} /></Grid>

                <Grid xs={12}>
                    <Collapse in={userRole === 'entregador'}>
                        <Grid container spacing={3}>
                            <Grid xs={12}><Typography variant="h6" sx={{mt:2}}>Informações do Veículo</Typography></Grid>
                            <Grid xs={12} md={6}><TextField name="vehicle_model" label="Modelo do Veículo" fullWidth onChange={handleChange} value={formData.vehicle_model} /></Grid>
                            <Grid xs={12} md={6}><TextField name="license_plate" label="Placa" fullWidth onChange={handleChange} value={formData.license_plate} /></Grid>
                        </Grid>
                    </Collapse>
                </Grid>

                <Grid xs={12} mt={2}>
                    <Button type="submit" variant="contained" color="primary" size="large">Salvar Usuário</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserForm;
