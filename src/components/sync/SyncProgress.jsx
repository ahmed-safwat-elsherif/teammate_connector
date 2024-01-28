import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { getSyncProgress } from '../../api/sync';
import { selectRefreshes } from '../../redux/status/selectors';
import { SyncStatus } from '../../utils/sync';
import useAbortEffect from '../../hooks/useAbortEffect';

const retry = (callback, options) => {
  const { delay = 1000 } = options || {};
  callback().then(shouldRetry => {
    if (!shouldRetry) return;
    setTimeout(() => {
      retry(callback, options);
    }, delay);
  });
};

const ACCURACY = 1e-1;

const SyncProgress = () => {
  const refreshes = useSelector(selectRefreshes);
  const [progress, setProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState();

  useAbortEffect(
    signal => {
      retry(
        () =>
          getSyncProgress(signal)
            .then(res => {
              const { progress: progressPct, syncStatus: status } = res.data || {};
              setSyncStatus(status);
              if (status !== SyncStatus.InProgress) return false;
              setProgress(progressPct);
              const shouldRetry = 100 - progressPct > ACCURACY;
              return shouldRetry;
            })
            .catch(() => false),
        { delay: 1000 }
      );
    },
    [refreshes]
  );

  const isProgressActive = useMemo(() => syncStatus === SyncStatus.InProgress, [syncStatus]);

  return (
    <Box>
      <Box>
        <Box fontWeight={700} component="span" display="inline-block" mr={1}>
          Synchronization progress:
        </Box>
        <Box component="span">{isProgressActive ? 'In progress..' : 'Stopped'}</Box>
      </Box>
      {isProgressActive && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SyncProgress;
