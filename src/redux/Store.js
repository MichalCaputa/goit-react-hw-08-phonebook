import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/ContactsSlice';
import { filterReducer } from './filter/FilterSlice';
import { authReducer } from './auth/AuthSlice';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
const myApi = {
  contacts: '/api/contacts',
  filter: 'api/filter',
};
const contactsPersistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['list'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

export const Store = configureStore({
  reducer: {
    contacts: persistReducer(contactsPersistConfig, contactsReducer),
    filter: filterReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: { extraArgument: myApi },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(Store);
