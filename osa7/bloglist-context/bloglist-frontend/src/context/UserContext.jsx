import { createContext, useContext, useReducer } from 'react';
import loginService from '../services/login';

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'CLEAR':
            return null;
        default:
            return state;
    }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, '');

    return <UserContextProvider value={[user, userDispatch]}>{props.children}</UserContextProvider>;
};

export const useUserValue = () => {
    const userAndDispatch = useContext(UserContext);
    return userAndDispatch[0];
};

export const useUserDispatch = () => {
    const userAndDispatch = useContext(UserContext);
    return userAndDispatch[1];
};

export const setNewUser = async (dispatch, credentials) => {
    const user = await loginService.loginUser(credentials);
    dispatch({ type: 'SET', payload: user });
};

export const clearUser = (dispatch) => {
    dispatch({ type: 'CLEAR' });
};

export default userReducer;
