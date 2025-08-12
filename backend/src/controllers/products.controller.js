// Mock-up de um pool de conexão com o banco de dados.
// Em um projeto real, isso viria de um arquivo de configuração (ex: db.js)
const pool = {
    query: (text, params) => {
        console.log('Executando query:', text, params);
        // Simula uma inserção bem-sucedida
        const newProduct = { id: Math.floor(Math.random() * 1000), ...params.reduce((obj, param, index) => ({...obj, [`col${index+1}`]: param }), {}) };
        return Promise.resolve({ rows: [newProduct], rowCount: 1 });
    }
};

// Controlador para criar um novo produto
exports.createProduct = async (req, res) => {
    const {
        name, brand, model, color, storage, battery_health,
        price, stock_quantity, category_id, condition_id
    } = req.body;

    // Validação simples
    if (!name || !price || !stock_quantity || !category_id || !condition_id) {
        return res.status(400).json({ message: 'Campos obrigatórios estão faltando.' });
    }

    const query = `
        INSERT INTO products (name, brand, model, color, storage, battery_health, price, stock_quantity, category_id, condition_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
    `;

    try {
        const values = [name, brand, model, color, storage, battery_health, price, stock_quantity, category_id, condition_id];
        const result = await pool.query(query, values);
        
        res.status(201).json({
            message: 'Produto criado com sucesso!',
            product: result.rows[0]
        });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Erro no servidor ao tentar criar o produto.' });
    }
};
