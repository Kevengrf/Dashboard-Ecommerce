require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rotas
// const authRoutes = require('./src/routes/auth.routes');
// const productRoutes = require('./src/routes/products.routes');
// const userRoutes = require('./src/routes/users.routes');
// const salesRoutes = require('./src/routes/sales.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de Teste
app.get('/', (req, res) => {
  res.send('API Recimportados no ar!');
});

// Usar Rotas (descomentar quando os arquivos de rota forem criados)
// app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/sales', salesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
