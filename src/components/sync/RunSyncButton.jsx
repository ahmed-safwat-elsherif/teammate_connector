import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import { runSync } from '../../api/sync';
import Popup from '../shared/Popup';
import { SyncStatus } from '../../utils/sync';
import { refresh } from '../../redux/status/actions';

// const getData = () =>
//   new Promise(resolve => {
//     setTimeout(() => {
//       resolve({ data: { syncStatus: SyncStatus.Done } });
//     }, 1000);
//   });
const RunSyncButton = () => {
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleRunSync = useCallback(() => {
    setLoading(true);
    runSync()
      // getData()
      .then(response => {
        dispatch(refresh());
        const { syncStatus: status } = response.data || {};
        setSyncStatus(status);
        setOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const statusMsg = useMemo(() => {
    switch (syncStatus) {
      case SyncStatus.InProgress:
        return 'Synchronization process is still in progress, You will be notified once it is done!';

      default:
        return 'Synchronization process is started, You will be notified once it is done!';
    }
  }, [syncStatus]);

  return (
    <>
      <LoadingButton loading={loading} color="info" variant="contained" onClick={handleRunSync}>
        Run sync
      </LoadingButton>
      <Popup title="Synchronization alert!" open={open} setOpen={setOpen} maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>{statusMsg}</Box>
      </Popup>
    </>
  );
};

export default RunSyncButton;
