-- Arquivo de Schema do Banco de Dados - Recimportados
-- SGBD: PostgreSQL

-- Tabela de Categorias de Produtos
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Condições de Produtos
CREATE TABLE conditions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(100),
    color VARCHAR(50),
    storage VARCHAR(50),
    battery_health INTEGER, -- Específico para celulares
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 1,
    photos TEXT[], -- Array de URLs de fotos
    videos TEXT[], -- Array de URLs de vídeos
    category_id INTEGER REFERENCES categories(id),
    condition_id INTEGER REFERENCES conditions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Usuários (Admin, Vendedor, Entregador)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'vendedor', 'entregador')),
    -- Campos específicos para entregador
    vehicle_model VARCHAR(100),
    license_plate VARCHAR(20),
    phone_number VARCHAR(20),
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Leads (potenciais vendas)
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_contact VARCHAR(255) NOT NULL,
    customer_address TEXT,
    payment_method VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'Novo', -- Novo, Em Atendimento, Vendido, Cancelado
    product_of_interest_id INTEGER REFERENCES products(id),
    assigned_seller_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Vendas
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    seller_id INTEGER NOT NULL REFERENCES users(id),
    lead_id INTEGER NOT NULL REFERENCES leads(id) UNIQUE,
    final_price NUMERIC(10, 2) NOT NULL,
    sale_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'Pendente' -- Pendente, Concluída para Entrega, Finalizada
);

-- Tabela de Entregas
CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER NOT NULL REFERENCES sales(id) UNIQUE,
    deliverer_id INTEGER REFERENCES users(id),
    status VARCHAR(50) NOT NULL DEFAULT 'Pendente', -- Pendente, Aceita, Concluída, Falhou
    acceptance_token VARCHAR(255) UNIQUE, -- Token único para a página de aceite
    accepted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    delivery_address TEXT NOT NULL,
    reference_point TEXT,
    payment_details TEXT NOT NULL
);

-- Tabela de Logs de Auditoria
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    target_entity VARCHAR(100),
    target_id INTEGER,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo dados iniciais
INSERT INTO categories (name) VALUES ('Celulares'), ('Computadores'), ('Relógios'), ('Diversos');
INSERT INTO conditions (name) VALUES ('Novo'), ('Seminovo'), ('Open Box'), ('Vitrine'), ('Recondicionado');
