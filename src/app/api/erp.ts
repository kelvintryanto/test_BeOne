import { ApiResponse, Customer, Transaction } from "@/types";

// ERP API Integration
export class ERPApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.ERP_API_URL || "http://erp-api.example.com";
  }

  async createCustomer(customer: Customer): Promise<ApiResponse<Customer>> {
    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });

      const data = await response.json();
      return { success: true, data };
    } catch {
      return { success: false };
    }
  }

  async createInvoice(transaction: Transaction): Promise<ApiResponse<void>> {
    try {
      await fetch(`${this.baseUrl}/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      return { success: true };
    } catch {
      return { success: false };
    }
  }
}
