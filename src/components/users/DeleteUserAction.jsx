import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from '../shared/Popup';
import { deleteUserById } from '../../api/user';

const DeleteUserAction = props => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const { id, username, onDelete } = props;

  const handleDelete = useCallback(() => {
    setLoading(true);
    deleteUserById(id)
      .then(() => {
        onDelete(id);
        setOpen(false);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [id, onDelete]);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon sx={{ color: 'red' }} />
      </IconButton>
      <Popup title={`Removing user "${username}"`} open={open} setOpen={setOpen} maxWidth="sm">
        <Box>Are you sure you want to remove user &ldquo;{username}&rdquo;</Box>
        <Stack mt={3} spacing={2} direction="row" justifyContent="center" alignItems="center">
          <LoadingButton variant="contained" loading={loading} onClick={handleDelete}>
            Yes
          </LoadingButton>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            No
          </Button>
        </Stack>
      </Popup>
    </>
  );
};

DeleteUserAction.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  username: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteUserAction;
