import { create } from 'zustand';
import { getFavorites, addFavorite, removeFavorite } from '../services/favorites';

interface FavoriteProduct {
  id: number;
  productId: number;
  product: any;
}

interface FavoritesState {
  favorites: FavoriteProduct[];
  loading: boolean;
  error: boolean;
  fetchFavorites: () => Promise<void>;
  addToFavorites: (productId: number) => Promise<void>;
  removeFromFavorites: (productId: number) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  loading: false,
  error: false,
  fetchFavorites: async () => {
    set({ loading: true });
    try {
      const favs = await getFavorites();
      set({ favorites: favs, error: false });
    } catch (e) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addToFavorites: async (productId: number) => {
    set({ loading: true });
    try {
      await addFavorite(productId);
      await useFavoritesStore.getState().fetchFavorites();
    } catch (e) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeFromFavorites: async (productId: number) => {
    set({ loading: true });
    try {
      await removeFavorite(productId);
      await useFavoritesStore.getState().fetchFavorites();
    } catch (e) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
