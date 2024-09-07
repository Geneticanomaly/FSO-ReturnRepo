import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/users';
import Header from './Header';
import ListGroup from 'react-bootstrap/ListGroup';

const UserView = () => {
    const userId = useParams().id;
    const [viewedUser, setViewedUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await userService.getUser(userId);
            setViewedUser(res);
        };
        fetchUser();
    }, [userId]);

    if (!viewedUser) {
        return null;
    }

    return (
        <div>
            <Header />
            <h2>{viewedUser.name}</h2>
            <b>Added blogs</b>
            <ListGroup>
                {viewedUser.blogs.map((blog) => (
                    <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default UserView;
