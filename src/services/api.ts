import { Customer, ApiResponse, CustomerFormData } from '../types/customer';

const API_BASE_URL = import.meta.env.VITE_API_URL

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
      console.log('getCustomers',`${API_BASE_URL}/customers/`)
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
  },

  getCustomerById: async (customerId: string): Promise<Customer> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}`);
      return handleResponse<Customer>(response);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  updateCustomer: async (customerId: string, formData: CustomerFormData): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });
      return handleResponse<void>(response);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
}
