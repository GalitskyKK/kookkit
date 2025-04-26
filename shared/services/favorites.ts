import { instance } from './instance';

export const getFavorites = async () => {
  return (await instance.get('/favorites')).data;
};

export const addFavorite = async (productId: number) => {
  return (await instance.post('/favorites', { productId })).data;
};

export const removeFavorite = async (productId: number) => {
  return (await instance.delete('/favorites', { data: { productId } })).data;
};
