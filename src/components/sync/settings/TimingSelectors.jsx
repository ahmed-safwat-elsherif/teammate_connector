import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { CRON_TYPES } from '../../../utils/cronJob';
import Select from '../../shared/Select';
import TimePicker from '../../shared/TimerPicker';
import DatePicker from '../../shared/DatePicker';

const days = [
  { value: 6, label: 'Saterday' },
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
];

const styles = {
  select: { minWidth: 200, '& .MuiInputBase-root': { backgroundColor: 'white' } },
  timerPicker: { '& .MuiInputBase-root': { backgroundColor: 'white' } },
};

const TimingSelectors = props => {
  const { type, values, onChange } = props;
  return (
    <Stack direction="row" spacing={3}>
      <DatePicker name="1" value={moment()} />
      <Box>Monthes</Box>
      <Box>
        {type === CRON_TYPES.WEEKLY && (
          <Select
            id="cron-type"
            label="Day"
            name="day"
            sx={styles.select}
            variant="filled"
            value={values.day}
            onChange={onChange}
            options={days}
          />
        )}
      </Box>
      <Box>
        <TimePicker
          name="time"
          label="Select time"
          value={values.time}
          onChange={onChange}
          sx={styles.timerPicker}
        />
      </Box>
    </Stack>
  );
};

TimingSelectors.propTypes = {
  type: PropTypes.oneOf([CRON_TYPES.WEEKLY, CRON_TYPES.MONTHLY, CRON_TYPES.QUARTERLY]).isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    type: PropTypes.string,
    time: PropTypes.shape({}),
    day: PropTypes.number,
    quarterMonths: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

TimingSelectors.defaultProps = {
  values: {},
};

export default TimingSelectors;
