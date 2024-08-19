import React from 'react';
import { useEffect, useState } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await userService.getAll();
            setUsers(users);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                    <tr>
                        <td>Users</td>
                        <td>Blogs created</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>

                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;
