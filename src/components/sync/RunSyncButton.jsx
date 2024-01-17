import React, { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { runSync } from '../../api/sync';
import Popup from '../shared/Popup';
import { SyncStatus } from '../../utils/sync';

const RunSyncButton = () => {
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState();
  const [open, setOpen] = useState(false);

  const handleRunSync = useCallback(() => {
    setLoading(true);
    runSync()
      .then(response => {
        const status = response.data.syncStatus;
        setSyncStatus(status);
        if (status === SyncStatus.InProgress) {
          setOpen(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const statusMsg = useMemo(() => {
    switch (syncStatus) {
      case SyncStatus.InProgress:
        return 'Syncronization process is still in progress, You will be notified once it is done!';

      case SyncStatus.Started:
        return 'Syncronization process is started, You will be notified once it is done!';

      default:
        return '';
    }
  }, [syncStatus]);

  return (
    <>
      <LoadingButton loading={loading} color="info" variant="contained" onClick={handleRunSync}>
        Run sync
      </LoadingButton>
      <Popup title="Syncronization alert!" open={open} setOpen={setOpen} maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>{statusMsg}</Box>
      </Popup>
    </>
  );
};

export default RunSyncButton;
