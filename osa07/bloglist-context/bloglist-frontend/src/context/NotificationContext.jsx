import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.payload;
        case 'HIDE':
            return '';
        default:
            return state;
    }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '');

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[1];
};

export const setNotification = (dispatch, notification, timeout, notificationRef) => {
    dispatch({ type: 'SHOW', payload: notification });

    if (notificationRef.current) {
        clearTimeout(notificationRef.current);
    }

    notificationRef.current = setTimeout(() => {
        dispatch({ type: 'HIDE' });
    }, timeout * 1000);
};

export default NotificationContext;
