import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser, logout } from './reducers/userReducer';
import UserPage from './pages/UserPage';
import './index.css';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import UserView from './components/UserView';

const App = () => {
    const user = useSelector((state) => {
        return state.user;
    });

    const notificationRef = useRef(null);
    const blogFormRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        }

        dispatch(initializeBlogs());
    }, []);

    return (
        <Router>
            {!user ? (
                <Routes>
                    <Route path="/" element={<LoginPage notificationRef={notificationRef} />} />
                </Routes>
            ) : (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <BlogPage
                                user={user}
                                notificationRef={notificationRef}
                                blogFormRef={blogFormRef}
                            />
                        }
                    />
                </Routes>
            )}
            <Routes>
                <Route path="/users" element={<UserPage user={user} />} />
            </Routes>
            <Routes>
                <Route path="/users/:id" element={<UserView />} />
            </Routes>
        </Router>
    );
};

export default App;
