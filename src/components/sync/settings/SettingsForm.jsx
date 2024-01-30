import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

import Select from '../../shared/Select';
import Popup from '../../shared/Popup';
import { CRON_TYPES } from '../../../utils/cronJob';
import TimingSelectors from './TimingSelectors';
import { createSettings } from '../../../api/sync';
import DeleteSystemBtn from './DeleteSystemBtn';

const styles = {
  select: { minWidth: 200, '& .MuiInputBase-root': { backgroundColor: 'white' } },
};
const cronJobTypes = [
  { value: CRON_TYPES.WEEKLY, label: 'Weekly' },
  { value: CRON_TYPES.MONTHLY, label: 'Monthly' },
  { value: CRON_TYPES.QUARTERLY, label: 'Quarterly' },
];

const initialQuarterMonths = [
  {
    key: 'QUARTER-1',
    range: [moment('0101', 'DDMM'), moment('3103', 'DDMM')],
    value: moment('0101', 'DDMM').format('YYYYMMDD'),
  },
  {
    key: 'QUARTER-2',
    range: [moment('0104', 'DDMM'), moment('3006', 'DDMM')],
    value: moment('0104', 'DDMM').format('YYYYMMDD'),
  },
  {
    key: 'QUARTER-3',
    range: [moment('0107', 'DDMM'), moment('3009', 'DDMM')],
    value: moment('0107', 'DDMM').format('YYYYMMDD'),
  },
  {
    key: 'QUARTER-4',
    range: [moment('0110', 'DDMM'), moment('3112', 'DDMM')],
    value: moment('0110', 'DDMM').format('YYYYMMDD'),
  },
];

const getInitialValues = settings => ({
  weekDay: '',
  monthDay: '',
  ...settings,
  quarterMonths: settings?.quarterMonths?.length ? settings.quarterMonths : initialQuarterMonths,
  type: settings?.type || '',
  time: moment(settings.time || undefined, 'HH:mm:ss'),
});

const SettingsForm = props => {
  const { settings: initialSettings } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState(() => getInitialValues(initialSettings));

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const { quarterMonths, time } = formValues;
      const settings = {
        ...formValues,
        quarterMonths: quarterMonths.map(quarter => quarter.value),
        time: time.format('HH:mm:ss'),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      setLoading(true);
      setError(null);
      createSettings(settings)
        .catch(err => {
          setError(err.response.data.message);
        })
        .finally(() => {
          setOpen(true);
          setLoading(false);
        });
    },
    [formValues]
  );

  const canSubmit = formValues?.type;

  return (
    <>
      <Stack component="form" onSubmit={handleSubmit} minHeight="calc(100vh - 250px)">
        <Box>
          <LoadingButton
            loading={loading}
            type="submit"
            sx={{ minWidth: 100 }}
            variant="contained"
            color="success"
            disabled={!canSubmit}
          >
            Save
          </LoadingButton>
        </Box>
        <Divider sx={{ my: 2, borderWidth: '1px' }} />
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
          <Stack flex={1}>
            {formValues.type ? (
              <TimingSelectors type={formValues.type} values={formValues} onChange={handleChange} />
            ) : (
              <Stack justifyContent="center" alignItems="center">
                <Box fontSize={15} fontWeight={600} fontStyle="italic">
                  Select a type!
                </Box>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ my: 2, borderWidth: '1px' }} />
      <Box>
        <DeleteSystemBtn />
      </Box>
      <Popup
        title="Synchronization Settings"
        titleIcon={
          error ? <CancelIcon sx={{ color: 'red' }} /> : <CheckIcon sx={{ color: 'green' }} />
        }
        open={open}
        setOpen={setOpen}
        maxWidth="sm"
      >
        <Box textAlign="center" my={3}>
          {error || 'Synchronization settings were set successfully!'}
        </Box>
      </Popup>
    </>
  );
};

SettingsForm.propTypes = {
  settings: PropTypes.shape({}).isRequired,
};

export default SettingsForm;
