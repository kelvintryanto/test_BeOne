import { ApiResponse, Customer } from "@/types";

// CRM API Integration
export class CRMApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.CRM_API_URL || "http://crm-api.example.com";
  }

  async registerCustomer(customer: Customer): Promise<ApiResponse<Customer>> {
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

  async updatePoints(
    customerId: string,
    points: number
  ): Promise<ApiResponse<void>> {
    try {
      await fetch(`${this.baseUrl}/customers/${customerId}/points`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points }),
      });

      return { success: true };
    } catch {
      return { success: false };
    }
  }
}
