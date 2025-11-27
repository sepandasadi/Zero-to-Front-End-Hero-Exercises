// chapter2_exercise_solution_local.js
// Solution variant 1: Local state only
// Build a Favorites feature with local state at the parent component.
// Requirements:
// - List items with Add/Remove buttons
// - Show Favorites count
// - Persist in memory for the session

import React, { useMemo, useState } from "react";

const CATALOG = [
  { id: 1, name: "Almond Croissant", price: 4.25 },
  { id: 2, name: "Matcha Latte", price: 5.50 },
  { id: 3, name: "Blueberry Muffin", price: 3.75 },
  { id: 4, name: "Cold Brew", price: 4.75 },
];

function Item({ item, isFavorite, toggle }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
      <span>{item.name} — ${item.price.toFixed(2)}</span>
      <button onClick={() => toggle(item.id)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

export default function AppLocalFavorites() {
  const [favorites, setFavorites] = useState(() => new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const count = favorites.size;
  const favoriteItems = useMemo(
    () => CATALOG.filter((i) => favorites.has(i.id)),
    [favorites]
  );

  return (
    <div style={{ maxWidth: 560, margin: "32px auto", fontFamily: "system-ui" }}>
      <h1>Favorites (Local State)</h1>
      <div style={{ marginBottom: 16 }}>Count: {count}</div>

      <h2>Catalog</h2>
      {CATALOG.map((item) => (
        <Item
          key={item.id}
          item={item}
          isFavorite={favorites.has(item.id)}
          toggle={toggleFavorite}
        />
      ))}

      <h2>Favorite Items</h2>
      {favoriteItems.length === 0 ? (
        <div>No favorites yet.</div>
      ) : (
        favoriteItems.map((i) => (
          <div key={i.id}>
            {i.name} — ${i.price.toFixed(2)}
          </div>
        ))
      )}
    </div>
  );
}
