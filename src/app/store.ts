import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import routeReducer from "./features/route/routeSlice";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderReducer from "./features/order/orderSlice";
import mapclickReducer from "./features/mapClick/mapClickSlice";
type RootReducerType = ReturnType<typeof rootReducer>;
const persisConfig: PersistConfig<RootReducerType> = {
  key: "root",
  storage,
  whitelist: ["route", "order"],
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  route: routeReducer,
  order: orderReducer,
  mapclick: mapclickReducer,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
