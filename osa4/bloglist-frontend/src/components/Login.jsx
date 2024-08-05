import {useState} from 'react';
import loginService from '../services/login';

const Login = ({setUser, setErrorMessage}) => {
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
            console.log(e);
            setErrorMessage(e.response.data.error);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                username
                <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required={true}
                />
                <br />
                password
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={true}
                />
                <br />
                <input type="Submit" defaultValue="login" />
            </form>
        </div>
    );
};

export default Login;
