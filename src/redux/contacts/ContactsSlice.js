import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addNewContact,
  deleteSelectedContact,
} from './ContactsThunk';
const handlePendingState = state => {
  state.isLoading = true;
};
const handleRejection = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const initialContactsState = { items: [], isLoading: false, error: null };
const isPendingAction = action => action.type.endsWith('pending');
const isRejectedAction = action => action.type.endsWith('reject');

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  extraReducers: builder => {
    builder

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteSelectedContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addMatcher(isPendingAction, handlePendingState)
      .addMatcher(isRejectedAction, handleRejection)
      .addDefaultCase((state, _action) => state);
  },
});

// export const { getContactsRejected, getTasksSuccessful } =
//   contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
