import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/shared/store/favorites";
import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const FavoritesLink: React.FC<Props> = ({ className }) => {
  const { favorites } = useFavoritesStore();
  return (
    <Link
      href="/favorites"
      className={cn(
        "flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors group",
        className
      )}
      aria-label="Favorites"
    >
      <Heart
        className={cn(
          "w-5 h-5 transition-colors",
          favorites.length > 0 ? "text-rose-500 fill-rose-500" : "text-gray-400"
        )}
      />
      <span className={cn("hidden md:block font-semibold text-base group-hover:text-rose-500", favorites.length > 0 ? "text-rose-500" : "text-gray-400")}>Favorites</span>
      {favorites.length > 0 && (
        <span className="ml-1 text-xs bg-rose-100 text-rose-600 rounded px-2 py-0.5">{favorites.length}</span>
      )}
    </Link>
  );
};
