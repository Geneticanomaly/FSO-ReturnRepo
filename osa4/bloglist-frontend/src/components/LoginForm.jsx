import { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ setUser, showMessage }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

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
            setUser(user);
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setFormData(() => ({
                username: '',
                password: '',
            }));
        } catch (e) {
            showMessage(e, 'error');
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
