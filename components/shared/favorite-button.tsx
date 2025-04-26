import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/shared/store/favorites";
import { useSession } from "next-auth/react";
import { cn } from "@/shared/lib/utils";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  productId: number;
  className?: string;
}

export const FavoriteButton: React.FC<Props> = ({ productId, className }) => {
  const { data: session } = useSession();
  const { favorites, addToFavorites, removeFromFavorites, loading } = useFavoritesStore();
  const [animate, setAnimate] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isFavorite = favorites.some((fav) => fav.productId === productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast("Войдите, чтобы добавить в избранное", {
        icon: "❤️",
      });
      // Открытие модалки авторизации (по желанию: можно пробросить событие или глобальный store)
      const event = new CustomEvent("open-auth-modal");
      window.dispatchEvent(event);
      return;
    }
    setAnimate(true);
    if (isFavorite) {
      await removeFromFavorites(productId);
    } else {
      // Не добавлять, если уже в избранном (доп. защита)
      if (favorites.some((fav) => fav.productId === productId)) {
        toast.error("Этот товар уже в избранном");
        setAnimate(false);
        return;
      }
      await addToFavorites(productId);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAnimate(false), 300);
  };


  return (
    <button
      aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      className={cn(
        "transition-colors text-rose-500 hover:text-rose-600 p-1",
        { "opacity-50 pointer-events-none": loading },
        className
      )}
      onClick={handleClick}
      disabled={loading}
      title={!session?.user ? "Войдите, чтобы добавить в избранное" : undefined}
      style={{ outline: "none" }}
    >
      {isFavorite ? (
        <Heart
          fill="#f43f5e"
          stroke="#f43f5e"
          className={cn("transition-transform", animate && "scale-125 animate-pulse")}
        />
      ) : (
        <Heart stroke="#808080" className={cn("transition-transform", animate && "scale-125 animate-pulse")}/>
      )}
    </button>
  );
};
