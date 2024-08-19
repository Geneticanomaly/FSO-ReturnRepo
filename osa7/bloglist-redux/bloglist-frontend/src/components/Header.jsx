import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
import Notification from './Notification';
import { Link } from 'react-router-dom';

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
            <p style={{ backgroundColor: '#A0A0A0', padding: '10px' }}>
                <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name} logged in{' '}
                <button onClick={handleLogOut}>Logout</button>
            </p>
            <h2>Blog App</h2>
            <Notification />
        </div>
    );
};

export default Header;
