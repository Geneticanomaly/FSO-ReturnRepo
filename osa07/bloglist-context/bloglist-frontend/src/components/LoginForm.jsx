import { useState } from 'react';
import loginService from '../services/login';
import { setNotification, useNotificationDispatch } from '../context/NotificationContext';
import { useUserDispatch } from '../context/UserContext';

const LoginForm = ({ notificationRef }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const dispatch = useNotificationDispatch();
    const userDispatch = useUserDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.loginUser(formData);
            userDispatch({ type: 'SET', payload: user });
            // setUser(user);
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setFormData(() => ({
                username: '',
                password: '',
            }));
        } catch (e) {
            setNotification(dispatch, e.response.data.error, 5, notificationRef);
        }
    };
    return (
        <div>
            <form onSubmit={handleLogin}>
                username
                <input name="username" type="text" value={formData.username} onChange={handleChange} />
                <br />
                password
                <input name="password" type="password" value={formData.password} onChange={handleChange} />
                <br />
                <input type="Submit" defaultValue="login" />
            </form>
        </div>
    );
};

export default LoginForm;
