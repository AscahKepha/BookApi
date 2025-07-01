import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from '../components/features/bookApi';

export const store = configureStore({
    reducer:{
      
        // Add the generated reducer as a specific top-level slice
        [bookApi.reducerPath]:bookApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware)

})