import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'HIDE',
    reducers: {
        showNotification(state, action) {
            return action.payload;
        },
        hideNotification(state, action) {
            return 'HIDE';
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, timeout, notificationRef) => {
    return (dispatch) => {
        dispatch(showNotification(message));

        if (notificationRef.current) {
            clearTimeout(notificationRef.current);
        }

        notificationRef.current = setTimeout(() => {
            dispatch(hideNotification());
        }, timeout * 1000);
    };
};

export default notificationSlice.reducer;
