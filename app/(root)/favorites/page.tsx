'use client'

import { useFavoritesStore } from "@/shared/store/favorites";
import { useEffect } from "react";
import { ProductCard } from "../../../components/shared/product-card";
import { Title } from "../../../components/shared/title";

export default function FavoritesPage() {
  const { favorites, fetchFavorites, loading } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="container mx-auto py-10">
      <Title text="Избранное" size="lg" className="mb-8 font-extrabold" />
      {loading ? (
        <div>Загрузка...</div>
      ) : favorites.length === 0 ? (
        <div className="text-gray-400 text-lg">У вас нет избранных продуктов.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-[50px]">
          {favorites.map((fav) => (
            <ProductCard
              key={fav.product.id}
              id={fav.product.id}
              name={fav.product.name}
              imageUrl={fav.product.imageUrl}
              price={fav.product.items?.[0]?.price || 0}
              ingredients={fav.product.ingredients || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
