import { Product, User, Lead, Sale } from '../types';

const sellers: User[] = [
    { id: 1, name: 'Ana Beatriz', role: 'vendedor', email: 'ana@rec.com' }, 
    { id: 2, name: 'Bruno Costa', role: 'vendedor', email: 'bruno@rec.com' }, 
    { id: 3, name: 'Carla Dias', role: 'vendedor', email: 'carla@rec.com' }, 
    { id: 4, name: 'Daniel Farias', role: 'vendedor', email: 'daniel@rec.com' }
];

const deliverers: User[] = [
    { id: 10, name: 'Felipe Moto', role: 'entregador', email: 'felipe@rec.com' }, 
    { id: 11, name: 'Ricardo Express', role: 'entregador', email: 'ricardo@rec.com' }
];

const products: Product[] = [
    { id: 101, name: 'iPhone 15 Pro', price: 7500, stock_quantity: 5, category: 'Celulares', condition: 'Novo' },
    { id: 102, name: 'Macbook Air M3', price: 9800, stock_quantity: 3, category: 'Computadores', condition: 'Seminovo' },
    { id: 103, name: 'Apple Watch Series 9', price: 3200, stock_quantity: 10, category: 'Relógios', condition: 'Novo' },
    { id: 104, name: 'Xiaomi 14 Ultra', price: 5500, stock_quantity: 4, category: 'Celulares', condition: 'Novo' },
    { id: 105, name: 'AirPods Pro 2', price: 1800, stock_quantity: 15, category: 'Diversos', condition: 'Novo' },
    { id: 106, name: 'iPhone 14', price: 4500, stock_quantity: 8, category: 'Celulares', condition: 'Seminovo' },
    { id: 107, name: 'Redmi Note 13', price: 1600, stock_quantity: 12, category: 'Celulares', condition: 'Novo' },
];

const leads: Lead[] = [
    { id: 1, name: 'João Silva', contact: '(81) 99999-1234', productId: 101, status: 'Novo', address: 'Rua A, 123' },
    { id: 2, name: 'Maria Oliveira', contact: '(81) 98888-5678', productId: 104, status: 'Novo', address: 'Av. B, 456' },
    { id: 3, name: 'Pedro Souza', contact: '(81) 97777-9012', productId: 102, status: 'Novo', address: 'Travessa C, 789' },
];

export const generateInitialState = () => ({
    users: [...sellers, ...deliverers],
    products,
    leads,
    sales: [] as Sale[],
});

// Função para gerar um número aleatório de vendas para cada vendedor
export const generateSalesData = (sales: Sale[], users: User[]) => {
    const sellers = users.filter(u => u.role === 'vendedor');
    return sellers.map(seller => {
        const mySales = sales.filter(s => s.sellerId === seller.id && s.isComplete);
        const totalValue = mySales.reduce((acc, sale) => {
            const product = products.find(p => p.id === sale.productId);
            return acc + (product ? product.price : 0);
        }, 0);
        return {
            name: seller.name,
            "Vendas (R$)": totalValue,
            "Qtd. Vendas": mySales.length,
        };
    });
};
