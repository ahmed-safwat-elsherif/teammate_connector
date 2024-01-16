import React, { useCallback, useState } from 'react';
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
        setSyncStatus(response.data.syncStatus);
        if (syncStatus === SyncStatus.InProgress) {
          setOpen(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [syncStatus]);
  return (
    <>
      <LoadingButton loading={loading} color="info" variant="contained" onClick={handleRunSync}>
        Run sync
      </LoadingButton>
      <Popup title="Syncronization alert!" open={open} setOpen={setOpen}>
        {syncStatus === SyncStatus.InProgress && (
          <div>
            Syncronization process is still in progress, You will be notified once it is done!
          </div>
        )}
        {syncStatus === SyncStatus.Started && (
          <div>Syncronization process is started, You will be notified once it is done!</div>
        )}
      </Popup>
    </>
  );
};

export default RunSyncButton;
