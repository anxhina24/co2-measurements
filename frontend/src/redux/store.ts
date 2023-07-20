import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Define the type for the state of the entire Redux store.
export type AppState = ReturnType<typeof rootReducer>;

// Configure the Redux store with the rootReducer.
const store = configureStore({ reducer: rootReducer});

export default store;
