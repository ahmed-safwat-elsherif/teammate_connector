import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePicker = props => {
  const { label, value, name, onChange, ...rest } = props;

  const parsedValue = useMemo(() => moment(value), [value]);

  const handleChange = useCallback(
    timeInMoment => {
      const date = timeInMoment?.startOf('day');
      onChange({ target: { name, value: date.format('YYYYMMDD') } });
    },
    [name, onChange]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiDatePicker
        views={['day', 'month']}
        value={parsedValue}
        onChange={handleChange}
        label={label}
        {...rest}
      />
    </LocalizationProvider>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  value: null,
  name: '',
};

export default DatePicker;
