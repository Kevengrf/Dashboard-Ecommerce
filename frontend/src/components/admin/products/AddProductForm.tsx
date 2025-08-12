import React, { useState } from 'react';
import { Box, TextField, Button, Grid, MenuItem, Paper, Typography, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import { Product } from '../../../types';

// Dados de exemplo para os selects
const categories = [
    { id: 1, name: 'Celulares' }, { id: 2, name: 'Computadores' },
    { id: 3, name: 'Relógios' }, { id: 4, name: 'Diversos' },
];

const conditions = [
    { id: 1, name: 'Novo' }, { id: 2, name: 'Seminovo' }, { id: 3, name: 'Open Box' },
    { id: 4, name: 'Vitrine' }, { id: 5, name: 'Recondicionado' },
];

const initialFormState: Product = {
    id: 0, // Será gerado pelo contexto/backend
    name: '',
    brand: '',
    model: '',
    color: '',
    storage: '',
    battery_health: undefined,
    price: 0,
    stock_quantity: 1,
    category_id: undefined,
    condition_id: undefined,
};

const AddProductForm: React.FC = () => {
    const [formData, setFormData] = useState<Product>(initialFormState);
    const [photos, setPhotos] = useState<File[]>([]);
    const { addProduct } = useApp();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotos(Array.from(e.target.files));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const categoryName = categories.find(c => c.id === formData.category_id)?.name;
        const conditionName = conditions.find(c => c.id === formData.condition_id)?.name;
        
        const newProductData: Product = { 
            ...formData, 
            category: categoryName,
            condition: conditionName,
            photos: photos.map(p => p.name) // Em um app real, faria o upload e guardaria a URL
        };

        addProduct(newProductData);
        
        setFormData(initialFormState);
        setPhotos([]);

        navigate('/');
    };

    return (
        <Paper component="form" sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" gutterBottom>Informações Básicas</Typography>
                </Grid>
                <Grid item xs={12} md={6}><TextField name="name" label="Nome do Produto" fullWidth required onChange={handleChange} value={formData.name} /></Grid>
                <Grid item xs={12} md={6}><TextField name="price" label="Preço" type="number" fullWidth required onChange={handleChange} value={formData.price} /></Grid>
                <Grid item xs={12} md={6}><TextField name="category_id" label="Categoria" select fullWidth required onChange={handleChange} value={formData.category_id}><MenuItem value={undefined}>Selecione</MenuItem>{categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}</TextField></Grid>
                <Grid item xs={12} md={6}><TextField name="condition_id" label="Condição" select fullWidth required onChange={handleChange} value={formData.condition_id}><MenuItem value={undefined}>Selecione</MenuItem>{conditions.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}</TextField></Grid>
                
                <Grid item xs={12} mt={2}>
                    <Typography variant="h5" component="h2" gutterBottom>Detalhes Específicos</Typography>
                </Grid>
                <Grid item xs={12} sm={6}><TextField name="brand" label="Marca" fullWidth onChange={handleChange} value={formData.brand} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="model" label="Modelo" fullWidth onChange={handleChange} value={formData.model} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="color" label="Cor" fullWidth onChange={handleChange} value={formData.color} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="storage" label="Armazenamento (GB)" fullWidth onChange={handleChange} value={formData.storage} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="battery_health" label="Saúde da Bateria (%)" type="number" fullWidth onChange={handleChange} value={formData.battery_health} /></Grid>
                <Grid item xs={12} sm={6}><TextField name="stock_quantity" label="Quantidade em Estoque" type="number" fullWidth required onChange={handleChange} value={formData.stock_quantity} /></Grid>

                <Grid item xs={12} mt={2}>
                    <Typography variant="h5" component="h2" gutterBottom>Mídia</Typography>
                    <Button variant="contained" component="label">
                        Carregar Fotos
                        <input type="file" hidden multiple onChange={handlePhotoChange} />
                    </Button>
                    {photos.length > 0 && <Typography sx={{ ml: 2, display: 'inline' }}>{photos.length} foto(s) selecionada(s)</Typography>}
                </Grid>

                <Grid item xs={12} mt={4}>
                    <Button type="submit" variant="contained" color="primary" size="large">Salvar Produto</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AddProductForm;