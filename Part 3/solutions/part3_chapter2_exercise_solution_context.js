// chapter2_exercise_solution_context.js
// Solution variant 2: React Context to avoid prop drilling
// Provides FavoritesContext with { favorites, toggleFavorite }

import React, { createContext, useContext, useMemo, useState } from "react";

const CATALOG = [
  { id: 1, name: "Almond Croissant", price: 4.25 },
  { id: 2, name: "Matcha Latte", price: 5.50 },
  { id: 3, name: "Blueberry Muffin", price: 3.75 },
  { id: 4, name: "Cold Brew", price: 4.75 },
];

const FavoritesContext = createContext(null);

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const value = useMemo(() => ({ favorites, toggleFavorite }), [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}

function CatalogItem({ item }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.has(item.id);
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
      <span>{item.name} — ${item.price.toFixed(2)}</span>
      <button onClick={() => toggleFavorite(item.id)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

function FavoritesList() {
  const { favorites } = useFavorites();
  const items = CATALOG.filter((i) => favorites.has(i.id));
  if (items.length === 0) return <div>No favorites yet.</div>;
  return (
    <div>
      {items.map((i) => (
        <div key={i.id}>
          {i.name} — ${i.price.toFixed(2)}
        </div>
      ))}
    </div>
  );
}

export default function AppContextFavorites() {
  const { favorites } = useFavorites(); // This would throw unless wrapped; wrap below.
  return null;
}

// Proper root with provider
export function Root() {
  const [mounted, setMounted] = useState(true); // for demo
  return (
    <FavoritesProvider>
      <div style={{ maxWidth: 560, margin: "32px auto", fontFamily: "system-ui" }}>
        <h1>Favorites (Context)</h1>
        <FavoritesCount />
        <h2>Catalog</h2>
        {CATALOG.map((item) => (
          <CatalogItem key={item.id} item={item} />
        ))}
        <h2>Favorite Items</h2>
        <FavoritesList />
      </div>
    </FavoritesProvider>
  );
}

function FavoritesCount() {
  const { favorites } = useFavorites();
  return <div style={{ marginBottom: 16 }}>Count: {favorites.size}</div>;
}
