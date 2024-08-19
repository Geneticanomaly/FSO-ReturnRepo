import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
import Notification from './Notification';

const Header = () => {
    const user = useSelector((state) => {
        return state.user;
    });

    const dispatch = useDispatch();

    const handleLogOut = () => {
        window.localStorage.clear();
        dispatch(logout());
    };

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged in <button onClick={handleLogOut}>Logout</button>
            </p>
        </div>
    );
};

export default Header;
