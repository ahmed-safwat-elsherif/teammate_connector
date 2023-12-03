import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import SettingsForm from '../components/sync/settings/SettingsForm';
import { getSettings } from '../api/sync';
import Loader from '../components/shared/Loader';

const SyncSettings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    setLoading(true);
    getSettings()
      .then(res => {
        setSettings(res.data);
      })
      .catch(() => {
        setError("Couldn't retreive the sync settings");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <Box>
        <Typography color="">{error}</Typography>
      </Box>
    );
  }
  return <SettingsForm settings={settings} />;
};

export default SyncSettings;
