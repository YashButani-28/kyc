import rootReducer from "./rootReducers";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
