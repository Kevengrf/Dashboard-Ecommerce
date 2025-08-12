const bcrypt = require('bcryptjs');

// Mock-up de um pool de conexão com o banco de dados.
const pool = {
    query: (text, params) => {
        console.log('Executando query:', text, params);
        const newUser = { id: Math.floor(Math.random() * 1000), email: params[1], role: params[3] };
        return Promise.resolve({ rows: [newUser], rowCount: 1 });
    }
};

exports.createUser = async (req, res) => {
    const {
        name, email, password, role, 
        vehicle_model, license_plate, phone_number
    } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Nome, email, senha e tipo de usuário são obrigatórios.' });
    }

    try {
        // Criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO users (name, email, password_hash, role, vehicle_model, license_plate, phone_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email, role;
        `;
        const values = [name, email, password_hash, role, vehicle_model, license_plate, phone_number];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user: result.rows[0]
        });

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro no servidor ao tentar criar o usuário.' });
    }
};