import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Popup from '../../shared/Popup';
import { endLoading, startLoading } from '../../../redux/status/actions';
import { clearSystemTables } from '../../../api/sync';
import useAdmin from '../../../hooks/useAdmin';

const DeleteSystemBtn = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [errorResult, setErrorResult] = useState();
  const { isAdmin } = useAdmin();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(startLoading());
    setOpenConfirm(false);
    setErrorResult(null);
    clearSystemTables()
      .catch(() => {
        setErrorResult("Couldn't clear system tables");
      })
      .finally(() => {
        setOpenResult(true);
        dispatch(endLoading());
      });
  }, [dispatch]);

  if (!isAdmin) return null;

  return (
    <>
      <Button variant="contained" color="error" size="small" onClick={() => setOpenConfirm(true)}>
        Clear system tables
      </Button>
      <Popup open={openConfirm} setOpen={setOpenConfirm} title="Clear system tables" maxWidth="sm">
        <Typography textAlign="center" mb={3}>
          Are you sure you want to clear the entire tables
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={3}>
          <Button variant="contained" size="small" color="error" onClick={handleClick}>
            Clear
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="info"
            onClick={() => setOpenConfirm(false)}
          >
            Cancel
          </Button>
        </Stack>
      </Popup>
      <Popup open={openResult} setOpen={setOpenResult} title="Clearing result" maxWidth="sm">
        <Typography textAlign="center" mb={3}>
          {errorResult || 'Tables cleared successfully!'}
        </Typography>
      </Popup>
    </>
  );
};

export default DeleteSystemBtn;
