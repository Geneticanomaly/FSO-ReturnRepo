import React from 'react';
import Header from '../components/Header';
import UserList from '../components/UserList';

const UserPage = ({ user }) => {
    if (!user) {
        return null;
    }

    return (
        <div>
            <Header user={user} />
            <UserList />
        </div>
    );
};

export default UserPage;
