import { Customer, ApiResponse, CustomerFormData } from '../types/customer';

const API_BASE_URL = '/api/api';

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data: ApiResponse<T> = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'API request failed');
  }
  return data.data as T;
};

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/`);
      return handleResponse<Customer[]>(response);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  createCustomer: async (formData: CustomerFormData): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/customers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    });
    return handleResponse<void>(response);
  },

  deleteCustomer: async (customerId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  }
}
