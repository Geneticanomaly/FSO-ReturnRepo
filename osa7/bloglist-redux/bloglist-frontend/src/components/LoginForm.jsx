import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/userReducer';

const LoginForm = ({ notificationRef }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const dispatch = useDispatch();

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
            const user = await dispatch(login(formData));
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setFormData(() => ({
                username: '',
                password: '',
            }));
        } catch (e) {
            dispatch(setNotification(e.response.data.error, 5, notificationRef));
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
