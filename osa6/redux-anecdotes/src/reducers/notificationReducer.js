import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'NONE',
    reducers: {
        showNotification(state, action) {
            return action.payload;
        },
        clearNotification() {
            return 'NONE';
        },
    },
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
