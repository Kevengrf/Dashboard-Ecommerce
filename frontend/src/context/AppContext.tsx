import { createContext, useContext, useState, useRef } from 'react';
import { generateInitialState } from '../utils/mockData';
import { productNames, productBrands, customerNames } from '../utils/randomData';
import { Product, User, Lead, Sale } from '../types';

interface AppContextType {
  users: User[];
  products: Product[];
  leads: Lead[];
  sales: Sale[];
  isDemoRunning: boolean;
  isAutoDemoRunning: boolean;
  attendLead: (leadId: number) => void;
  convertToSale: (leadId: number) => Sale | undefined;
  updateDeliveryStatus: (saleId: number, status: Sale['deliveryStatus']) => void;
  startDemo: () => void;
  stopDemo: () => void;
  startAutoDemo: () => void;
  stopAutoDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const initialState = generateInitialState();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialState.users);
  const [products, setProducts] = useState<Product[]>(initialState.products);
  const [leads, setLeads] = useState<Lead[]>(initialState.leads);
  const [sales, setSales] = useState<Sale[]>(initialState.sales);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [isAutoDemoRunning, setIsAutoDemoRunning] = useState(false);
  const demoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoDemoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const attendLead = (leadId: number) => {
    setLeads(prevLeads => prevLeads.map(l => l.id === leadId ? { ...l, status: 'Em Atendimento' } : l));
  };

  const convertToSale = (leadId: number): Sale | undefined => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return undefined;

    // 1. Dar baixa no estoque
    setProducts(prevProducts => prevProducts.map(p => p.id === lead.productId ? { ...p, stock_quantity: p.stock_quantity - 1 } : p));

    // 2. Mudar status do Lead
    setLeads(prevLeads => prevLeads.map(l => l.id === leadId ? { ...l, status: 'Vendido' } : l));

    // 3. Criar a Venda e a Entrega
    const availableSellers = users.filter(u => u.role === 'vendedor');
    const seller = availableSellers[Math.floor(Math.random() * availableSellers.length)];
    const deliverer = users.find(u => u.role === 'entregador'); // Pega o primeiro entregador

    if (!seller || !deliverer) {
        console.error("Vendedor ou entregador não encontrado para a demo.");
        return undefined;
    }

    const newSale: Sale = {
      id: sales.length + 1,
      leadId: lead.id,
      customerName: lead.name,
      customerAddress: lead.address,
      productName: products.find(p => p.id === lead.productId)?.name || 'Produto Desconhecido',
      productId: lead.productId,
      sellerId: seller.id,
      sellerName: seller.name,
      delivererId: deliverer.id,
      delivererName: deliverer.name,
      deliveryStatus: 'Pedido Recebido',
      isComplete: false,
    };
    setSales(prevSales => [...prevSales, newSale]);
    return newSale;
  };

  const updateDeliveryStatus = (saleId: number, status: Sale['deliveryStatus']) => {
    setSales(prevSales => prevSales.map(s => s.id === saleId ? { ...s, deliveryStatus: status } : s));
  };

  const startDemo = () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);

    const availableLeads = leads.filter(l => l.status === 'Novo');
    if (availableLeads.length === 0) {
      alert('Não há leads novos para iniciar a demonstração!');
      setIsDemoRunning(false);
      return;
    }

    const leadToProcess = availableLeads[Math.floor(Math.random() * availableLeads.length)];

    // Etapa 1: Atender o Lead
    attendLead(leadToProcess.id);

    setTimeout(() => {
      // Etapa 2: Converter em Venda
      const newSale = convertToSale(leadToProcess.id);

      if (newSale) {
        // Etapa 3: Simular o progresso da entrega
        const deliverySteps: Sale['deliveryStatus'][] = ['Pedido Recebido', 'A Caminho', 'Entregue'];
        let currentStepIndex = 0;

        demoIntervalRef.current = setInterval(() => {
          currentStepIndex++;
          if (currentStepIndex < deliverySteps.length) {
            updateDeliveryStatus(newSale.id, deliverySteps[currentStepIndex]);
          } else {
            // Entrega concluída
            clearInterval(demoIntervalRef.current as NodeJS.Timeout);
            setIsDemoRunning(false);
            // Marcar venda como completa
            setSales(prevSales => prevSales.map(s => s.id === newSale.id ? { ...s, isComplete: true } : s));
          }
        }, 3000); // Avança a cada 3 segundos
      }
    }, 2000); // 2 segundos após atender o lead
  };

  const stopDemo = () => {
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
    }
    setIsDemoRunning(false);
    alert('Demonstração parada.');
  };

  const createRandomProduct = () => {
    const newProduct: Product = {
      id: products.length + 101,
      name: productNames[Math.floor(Math.random() * productNames.length)],
      brand: productBrands[Math.floor(Math.random() * productBrands.length)],
      price: Math.floor(Math.random() * 10000) + 1000,
      stock_quantity: Math.floor(Math.random() * 20) + 1,
      category: 'Celulares',
      condition: 'Novo',
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const createRandomLead = () => {
    const availableProducts = products.filter(p => p.stock_quantity > 0);
    if (availableProducts.length === 0) return;

    const product = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    const newLead: Lead = {
      id: leads.length + 1,
      name: customerNames[Math.floor(Math.random() * customerNames.length)],
      contact: '(81) 9' + Math.floor(Math.random() * 90000000 + 10000000),
      productId: product.id,
      status: 'Novo',
      address: 'Rua Gerada Automaticamente, 123',
    };
    setLeads(prevLeads => [...prevLeads, newLead]);
  };

  const startAutoDemo = () => {
    if (isAutoDemoRunning) return;
    setIsAutoDemoRunning(true);

    autoDemoIntervalRef.current = setInterval(() => {
      const action = Math.random();
      if (action < 0.2) {
        createRandomProduct();
      } else if (action < 0.6) {
        createRandomLead();
      } else {
        const availableLeads = leads.filter(l => l.status === 'Novo');
        if (availableLeads.length > 0) {
          const leadToProcess = availableLeads[Math.floor(Math.random() * availableLeads.length)];
          const newSale = convertToSale(leadToProcess.id);
          if (newSale) {
            const deliverySteps: Sale['deliveryStatus'][] = ['Pedido Recebido', 'A Caminho', 'Entregue'];
            let currentStepIndex = 0;
            const deliveryInterval = setInterval(() => {
              currentStepIndex++;
              if (currentStepIndex < deliverySteps.length) {
                updateDeliveryStatus(newSale.id, deliverySteps[currentStepIndex]);
              } else {
                clearInterval(deliveryInterval);
                setSales(prevSales => prevSales.map(s => s.id === newSale.id ? { ...s, isComplete: true } : s));
              }
            }, 3000);
          }
        }
      }
    }, 2000);
  };

  const stopAutoDemo = () => {
    if (autoDemoIntervalRef.current) {
      clearInterval(autoDemoIntervalRef.current);
    }
    setIsAutoDemoRunning(false);
    alert('Demonstração automática parada.');
  };

  const value = {
    users, products, leads, sales,
    attendLead, convertToSale, updateDeliveryStatus,
    isDemoRunning, startDemo, stopDemo,
    isAutoDemoRunning, startAutoDemo, stopAutoDemo
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
