// chapter2_exercise_solution_store_rtk.js
// Solution variant 3: Redux Toolkit store
// Minimal, single-file demo (real apps split into files).

import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

const CATALOG = [
  { id: 1, name: "Almond Croissant", price: 4.25 },
  { id: 2, name: "Matcha Latte", price: 5.50 },
  { id: 3, name: "Blueberry Muffin", price: 3.75 },
  { id: 4, name: "Cold Brew", price: 4.75 },
];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] },
  reducers: {
    toggle(state, action) {
      const id = action.payload;
      const idx = state.ids.indexOf(id);
      if (idx >= 0) state.ids.splice(idx, 1);
      else state.ids.push(id);
    }
  }
});

const { toggle } = favoritesSlice.actions;

const store = configureStore({
  reducer: { favorites: favoritesSlice.reducer }
});

function CatalogItem({ item }) {
  const ids = useSelector((s) => s.favorites.ids);
  const dispatch = useDispatch();
  const isFavorite = ids.includes(item.id);
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
      <span>{item.name} — ${item.price.toFixed(2)}</span>
      <button onClick={() => dispatch(toggle(item.id))}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

function FavoritesCount() {
  const count = useSelector((s) => s.favorites.ids.length);
  return <div style={{ marginBottom: 16 }}>Count: {count}</div>;
}

function FavoritesList() {
  const ids = useSelector((s) => s.favorites.ids);
  const items = CATALOG.filter((i) => ids.includes(i.id));
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

export default function AppReduxToolkitFavorites() {
  return (
    <Provider store={store}>
      <div style={{ maxWidth: 560, margin: "32px auto", fontFamily: "system-ui" }}>
        <h1>Favorites (Redux Toolkit)</h1>
        <FavoritesCount />
        <h2>Catalog</h2>
        {CATALOG.map((item) => (
          <CatalogItem key={item.id} item={item} />
        ))}
        <h2>Favorite Items</h2>
        <FavoritesList />
      </div>
    </Provider>
  );
}
