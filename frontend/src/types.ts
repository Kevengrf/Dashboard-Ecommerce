export interface Product {
  id: number;
  name: string;
  brand?: string;
  model?: string;
  color?: string;
  storage?: string;
  battery_health?: number;
  price: number;
  stock_quantity: number;
  category_id?: number;
  condition_id?: number;
  category?: string;
  condition?: string;
  photos?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash?: string;
  role: 'admin' | 'vendedor' | 'entregador';
  vehicle_model?: string;
  license_plate?: string;
  phone_number?: string;
  photo_url?: string;
}

export interface Lead {
  id: number;
  name: string;
  contact: string;
  address?: string;
  paymentMethod?: string;
  status: 'Novo' | 'Em Atendimento' | 'Vendido' | 'Cancelado';
  productId: number;
}

export interface Sale {
  id: number;
  leadId: number;
  customerName: string;
  customerAddress?: string;
  productName: string;
  productId: number;
  sellerId: number;
  sellerName: string;
  delivererId: number;
  delivererName: string;
  deliveryStatus: 'Pedido Recebido' | 'A Caminho' | 'Entregue';
  isComplete: boolean;
}
