import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Customer } from '../types/customer';
import { customerService } from '../services/api';

interface CustomerState {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  deleteCustomer: (customerId: string) => Promise<void>;
  resetEditedStatus: (customerId: string) => Promise<void>;
}

export const useCustomerStore = create<CustomerState>()(
  devtools(
    (set, get) => ({
      customers: [],
      isLoading: false,
      error: null,

      fetchCustomers: async () => {
        set({ isLoading: true, error: null }, false, 'customers/fetch');
        try {
          const customers = await customerService.getCustomers();
          set({ customers, isLoading: false }, false, 'customers/fetch/success');
        } catch (error) {
          console.error('Failed to fetch customers:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch customers', 
            isLoading: false 
          }, false, 'customers/fetch/error');
        }
      },

      deleteCustomer: async (customerId: string) => {
        set({ isLoading: true, error: null }, false, 'customers/delete');
        try {
          await customerService.deleteCustomer(customerId);
          // Update the customers list after deletion
          set(state => ({
            customers: state.customers.filter(customer => customer.customerId !== customerId),
            isLoading: false
          }), false, 'customers/delete/success');
        } catch (error) {
          console.error('Failed to delete customer:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete customer', 
            isLoading: false 
          }, false, 'customers/delete/error');
        }
      },

      resetEditedStatus: async (customerId: string) => {
        set({ isLoading: true }, false, 'customers/resetStatus');
        try {
          const customer = get().customers.find(c => c.customerId === customerId);
          if (!customer) {
            set({ isLoading: false }, false, 'customers/resetStatus/notFound');
            return;
          }

          const updatedFormData = {
            ...customer.formData,
            editedByCustomer: false
          };

          await customerService.updateCustomer(customerId, updatedFormData);
          
          // Update the customer in the store
          set(state => ({
            customers: state.customers.map(c => 
              c.customerId === customerId 
                ? { ...c, formData: updatedFormData } 
                : c
            ),
            isLoading: false
          }), false, 'customers/resetStatus/success');
        } catch (error) {
          console.error('Failed to reset edited status:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to reset edited status',
            isLoading: false
          }, false, 'customers/resetStatus/error');
        }
      }
    }),
    { name: 'customer-store' }
  )
); 