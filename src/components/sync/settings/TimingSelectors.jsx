import { useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { CRON_TYPES } from '../../../utils/cronJob';
import Select from '../../shared/Select';
import TimePicker from '../../shared/TimerPicker';
import DatePicker from '../../shared/DatePicker';

const monthDays = Array.from(Array(28), (_, index) => ({ value: index + 1, label: index + 1 }));

const weekDays = [
  { value: 6, label: 'Saturday' },
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

  const handleSelectQuarter = useCallback(
    (e, quarterIndex) => {
      const newQuarters = values.quarterMonths.map((q, index) =>
        index === quarterIndex ? { ...q, value: e.target.value } : q
      );
      onChange({ target: { name: 'quarterMonths', value: newQuarters } });
    },
    [onChange, values.quarterMonths]
  );

  return (
    <Stack spacing={3}>
      {type === CRON_TYPES.QUARTERLY && (
        <Stack direction="row" spacing={1} divider={<Divider flexItem sx={{ borderWidth: 1 }} />}>
          {values.quarterMonths.map((quarter, index) => (
            <DatePicker
              label={`Quarter ${index + 1}`}
              key={quarter.key}
              onChange={e => handleSelectQuarter(e, index)}
              value={quarter.value}
              minDate={quarter.range[0]}
              maxDate={quarter.range[1]}
            />
          ))}
        </Stack>
      )}
      {type === CRON_TYPES.MONTHLY && (
        <Box>
          <Select
            id="day-of-month"
            label="Day of month"
            name="monthDay"
            sx={styles.select}
            variant="filled"
            value={values.monthDay}
            onChange={onChange}
            options={monthDays}
          />
        </Box>
      )}
      {type === CRON_TYPES.WEEKLY && (
        <Box>
          <Select
            id="day-of-week"
            label="Day"
            name="weekDay"
            sx={styles.select}
            variant="filled"
            value={values.weekDay}
            onChange={onChange}
            options={weekDays}
          />
        </Box>
      )}
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
    monthDay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    weekDay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    quarterMonths: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

TimingSelectors.defaultProps = {
  values: {},
};

export default TimingSelectors;
