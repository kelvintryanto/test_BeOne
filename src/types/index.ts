// Common Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipId?: string;
  point: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  items: TransactionItem[];
  total: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionItem {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
