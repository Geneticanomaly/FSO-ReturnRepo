import React from 'react';
import { useEffect, useState } from 'react';
import userService from '../services/users';

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
            <table>
                <thead>
                    <tr>
                        <td>Users</td>
                        <td>Blogs created</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>

                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
