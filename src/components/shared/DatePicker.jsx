import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePicker = props => {
  const { label, value, name, onChange, ...rest } = props;

  const handleChange = useCallback(
    timeInMoment => {
      onChange({ target: { name, value: timeInMoment } });
    },
    [name, onChange]
  );
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiDatePicker
        views={['day', 'month']}
        value={value}
        onChange={handleChange}
        label={label}
        {...rest}
      />
    </LocalizationProvider>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.shape({}),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  value: null,
};

export default DatePicker;
