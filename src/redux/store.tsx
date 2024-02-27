import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer  from "./RootReducer";
// import logger from 'redux-logger'
// const middleware = [...getDefaultMiddleware(), logger];

// import { rootReducer } from "./RootReducer";
import storage from "redux-persist/lib/storage"; // Use the storage engine you prefer



// Define the persistence configuration
const persistConfig = {
    key: 'root', // Key to store your data in local storage
    storage, // Storage engine to use
    // Optionally, you can blacklist or whitelist specific reducers
    // blacklist: ['reducerToExclude'],
    // whitelist: ['reducerToPersist'],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
    reducer: {
        root: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor };