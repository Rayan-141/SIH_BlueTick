import { create } from 'zustand';
import { UserModel } from '../models/types';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  user: UserModel | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // Mock login — BACKEND TEAM: replace with real API call
      await new Promise((r) => setTimeout(r, 1000));
      const mockUser: UserModel = {
        id: '1',
        email,
        name: 'Aarav Verma',
        role: 'Inspector',
        organization: 'BIS',
      };
      await SecureStore.setItemAsync('access_token', 'mock_jwt_token');
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('access_token');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = await SecureStore.getItemAsync('access_token');
    if (token) {
      set({
        isAuthenticated: true,
        user: { id: '1', email: 'aarav@bis.gov.in', name: 'Aarav Verma', role: 'Inspector' },
      });
      return true;
    }
    return false;
  },
}));
