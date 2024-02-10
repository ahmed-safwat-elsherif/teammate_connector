import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';

import Loader from '../../components/shared/Loader';
import userRoles from '../../utils/userRoles';
import DeleteUserAction from '../../components/users/DeleteUserAction';
import { getUsers } from '../../api/user';

const rolesToLabels = {
  [userRoles.ADMIN]: 'Admin',
  [userRoles.USER]: 'User',
};

const UsersList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getUsers()
      .then(res => {
        setUsers(res.data.users);
      })
      .catch(() => {
        setError("Error: couldn't get the list of users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = useCallback(id => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <Box color="red" fontSize={20}>
        {error}
      </Box>
    );
  }

  return (
    <>
      <Button
        variant="containe"
        startIcon={<AddCircleOutlineIcon />}
        component={Link}
        to="/users/add"
      >
        Add user
      </Button>
      <TableContainer sx={{ background: 'white', '& th': { fontWeight: 600 } }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">*</TableCell>
              <TableCell component="th">First name</TableCell>
              <TableCell component="th">Last name</TableCell>
              <TableCell component="th">Username</TableCell>
              <TableCell component="th">Role</TableCell>
              <TableCell component="th">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!users.length && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box textAlign="center">Empty</Box>
                </TableCell>
              </TableRow>
            )}
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{rolesToLabels[user.role] ?? 'Not defined!'}</TableCell>
                <TableCell>
                  <DeleteUserAction {...user} onDelete={handleDeleteUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersList;
