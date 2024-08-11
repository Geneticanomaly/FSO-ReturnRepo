import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'NONE',
    reducers: {
        message(state, action) {
            return action.payload;
        },
    },
});

export const { message } = notificationSlice.actions;

export default notificationSlice.reducer;
