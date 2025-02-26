import { ObjectId } from "mongodb";

// Common Types
export interface Customer {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  points?: number;
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

export type CreateCustomer = Omit<
  Customer,
  "_id" | "createdAt" | "updatedAt" | "points"
>;

export type LoginCustomer = Omit<
  Customer,
  "_id" | "name" | "createdAt" | "updatedAt" | "points"
>;
