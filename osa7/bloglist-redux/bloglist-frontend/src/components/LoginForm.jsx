import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/userReducer';
import { Form, Button } from 'react-bootstrap';

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
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <br />
                <Button type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default LoginForm;
