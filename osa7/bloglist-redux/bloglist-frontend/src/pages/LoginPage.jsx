import React from 'react';
import Notification from '../components/Notification';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ notificationRef }) => {
    return (
        <div>
            <h2>Login to application</h2>
            <Notification />
            <LoginForm notificationRef={notificationRef} />
        </div>
    );
};

export default LoginPage;
