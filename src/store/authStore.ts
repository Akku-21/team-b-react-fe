import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123', // In real app, this would be hashed
    name: 'Admin User'
  }
];

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        login: async (email: string, password: string) => {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          const user = MOCK_USERS.find(u => u.email === email && u.password === password);
          
          if (!user) {
            throw new Error('Invalid credentials');
          }

          const token = `mock-jwt-token-${Math.random()}`;
          
          set({
            user: { id: user.id, email: user.email, name: user.name },
            token,
            isAuthenticated: true
          }, false, 'auth/login');
        },

        logout: () => {
          set({
            user: null,
            token: null,
            isAuthenticated: false
          }, false, 'auth/logout');
        }
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ 
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated
        })
      }
    ),
    { name: 'auth-store' }
  )
); 