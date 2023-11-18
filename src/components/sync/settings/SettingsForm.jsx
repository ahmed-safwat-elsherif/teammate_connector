import React, { useCallback, useState } from 'react';
import moment from 'moment';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';

import Select from '../../shared/Select';
import { CRON_TYPES } from '../../../utils/cronJob';
import TimingSelectors from './TimingSelectors';

const styles = {
  select: { minWidth: 200, '& .MuiInputBase-root': { backgroundColor: 'white' } },
};
const cronJobTypes = [
  { value: CRON_TYPES.WEEKLY, label: 'Weekly' },
  { value: CRON_TYPES.MONTHLY, label: 'Monthly' },
  { value: CRON_TYPES.QUARTERLY, label: 'Quarterly' },
];

const quarterMonths = [
  { range: [moment().set('months', 1).set('day', 1), moment().set('months', 1)], value: null },
  { range: [moment(''), moment()], value: null },
  { range: [], value: null },
  { range: [], value: null },
];

const SettingsForm = () => {
  const [formValues, setFormValues] = useState({
    type: '',
    day: '',
    time: moment(),
    quarterMonths,
  });
  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  }, []);

  return (
    <Stack component="form" minHeight="calc(100vh - 250px)">
      <Box>
        <LoadingButton type="submit" sx={{ minWidth: 100 }} variant="contained" color="success">
          Save
        </LoadingButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Stack
        flex={1}
        direction="row"
        spacing={2}
        divider={<Divider flexItem sx={{ borderWidth: '1px' }} />}
      >
        <Box>
          <Select
            id="cron-type"
            label="Sync Strategy"
            name="type"
            sx={styles.select}
            variant="filled"
            value={formValues.type}
            onChange={handleChange}
            options={cronJobTypes}
          />
        </Box>
        <Box>
          {formValues.type ? (
            <TimingSelectors type={formValues.type} values={formValues} onChange={handleChange} />
          ) : (
            <Box>Select a type!</Box>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default SettingsForm;
