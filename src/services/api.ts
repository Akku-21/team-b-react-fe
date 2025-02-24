import axios from 'axios';
import { Customer, ApiResponse } from '../types/customer';

const API_BASE_URL = '/api';

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    try {
      const response = await axios.get<ApiResponse<Customer[]>>(`${API_BASE_URL}/customers/`);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Failed to fetch customers');
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  deleteCustomer: async (customerId: string): Promise<void> => {
    const response = await axios.delete<ApiResponse<void>>(`${API_BASE_URL}/customers/${customerId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete customer');
    }
  }
}
