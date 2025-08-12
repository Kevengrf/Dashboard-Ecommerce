import React, { createContext, useState, useContext } from 'react';

// Dados de exemplo iniciais
const initialProducts = [
  { id: 1, name: 'iPhone 14 Pro', category: 'Celulares', condition: 'Novo', price: '7500', stock_quantity: 5 },
  { id: 2, name: 'Macbook Air M2', category: 'Computadores', condition: 'Seminovo', price: '8000', stock_quantity: 2 },
];

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (newProduct) => {
    // Em uma app real, o ID viria do backend.
    const productWithId = { ...newProduct, id: Math.floor(Math.random() * 10000) };
    setProducts(prevProducts => [productWithId, ...prevProducts]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
