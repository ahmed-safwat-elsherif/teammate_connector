import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from '../providers/AuthProvider';
import Home from '../pages/Home';
import Queries from '../pages/Queries';
import SyncLogs from '../pages/SyncLogs';
import SyncSettings from '../pages/SyncSettings';
import NotFound from '../pages/NotFound';

const User = () => (
  <AuthProvider>
    <Routes>
      <Route index element={<Home />} />
      <Route path="queries" element={<Queries />} />
      <Route path="sync">
        <Route index element={<SyncLogs />} />
        <Route path="settings" element={<SyncSettings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default User;
