// src/services/credits.ts
interface CreditsResponse {
  success: boolean;
  credits: number;
  message?: string;
}

interface OrderResponse {
  success: boolean;
  order?: {
    id: string;
    amount: number;
    currency: string;
    created_at: string;
  };
  message?: string;
}

export const creditsService = {
  async refreshCredits(): Promise<number> {
    try {
      const response = await fetch('/credits_refresh');
      const data: CreditsResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to refresh credits');
      }
      
      return data.credits;
    } catch (error) {
      console.error('Failed to refresh credits:', error);
      return 0;
    }
  },

  async addCredits(amount: number) {
    try {
      const response = await fetch('/create_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      
      const data: OrderResponse = await response.json();
      
      if (!data.success || !data.order) {
        throw new Error(data.message || 'Failed to create order');
      }
      
      return data.order;
    } catch (error) {
      console.error('Failed to add credits:', error);
      throw error;
    }
  }
};