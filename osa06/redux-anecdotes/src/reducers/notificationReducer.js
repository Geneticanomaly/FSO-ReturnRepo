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

export const setNotification = (message, timeout, notificationRef) => {
    return (dispatch) => {
        dispatch(showNotification(message));

        if (notificationRef.current) {
            clearTimeout(notificationRef.current);
        }

        notificationRef.current = setTimeout(() => {
            dispatch(clearNotification());
        }, timeout * 1000);
    };
};

export default notificationSlice.reducer;
