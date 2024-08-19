import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from '../reducers/userReducer';

const NavBar = () => {
    const user = useSelector((state) => {
        return state.user;
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        window.localStorage.clear();
        dispatch(logout());
        navigate('/');
    };

    if (!user) return null;

    return (
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container fluid>
                <Nav className="me-auto" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <Nav.Link style={{ color: 'white' }} href="/">
                        Blogs
                    </Nav.Link>
                    <Nav.Link style={{ color: 'white' }} href="/users">
                        Users
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Navbar.Text className="ms-auto d-flex align-items-center" style={{ color: 'white' }}>
                        Logged in {user.name}
                        <Button variant="secondary" onClick={handleLogOut} className="ms-2">
                            Logout
                        </Button>
                    </Navbar.Text>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
