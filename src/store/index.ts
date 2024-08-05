import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";

const persistanceLocalStorageMiddleware = (store: { getState: () => unknown; }) => (next: (arg0: unknown) => void) => (action: unknown) => {
    next(action);
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
}

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistanceLocalStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;