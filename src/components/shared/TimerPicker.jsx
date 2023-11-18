import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker as MuiTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const TimePicker = props => {
  const { label, value, name, onChange, ...rest } = props;

  const handleChange = useCallback(
    timeInMoment => {
      onChange({ target: { name, value: timeInMoment } });
    },
    [name, onChange]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiTimePicker value={value} onChange={handleChange} label={label} {...rest} />
    </LocalizationProvider>
  );
};

TimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.shape({}),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TimePicker.defaultProps = {
  value: null,
};

export default TimePicker;
