import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthProvider from '../providers/AuthProvider';
import Home from '../pages/Home';
import Queries from '../pages/Queries';
import SyncLogs from '../pages/SyncLogs';
import SyncSettings from '../pages/SyncSettings';
import NotFound from '../pages/NotFound';
import AddUser from '../pages/user/AddUser';
import UpdateUser from '../pages/user/UpdateUser';
import ChangePassword from '../pages/user/ChangePassword';
import UsersList from '../pages/user/UsersList';
import { selectIsAdmin } from '../redux/auth/selector';

const User = () => {
  const isAdmin = useSelector(selectIsAdmin);
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="queries" element={<Queries />} />
        <Route path="profile">
          <Route index element={<UpdateUser />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        {isAdmin && (
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit/:id" element={<div>Edit user page</div>} />
          </Route>
        )}
        <Route path="sync">
          <Route index element={<SyncLogs />} />
          <Route path="settings" element={<SyncSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default User;
