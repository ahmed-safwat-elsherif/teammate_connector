import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/**
 *
 * @param {import('@mui/material/Select').SelectProps} props
 * @returns
 */
const Select = props => {
  const { id, variant, value, onChange, options, label, sx, ...rest } = props;

  const handleChange = useCallback(
    e => {
      onChange(e);
    },
    [onChange]
  );

  return (
    <FormControl variant={variant} sx={{ minWidth: 120, ...sx }}>
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect
        id={id}
        variant={variant}
        value={value}
        onChange={handleChange}
        size="small"
        {...rest}
      >
        <MenuItem value="">
          <em>Select</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  sx: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

Select.defaultProps = {
  value: '',
  options: [],
  variant: 'outlined',
  sx: null,
};

export default Select;
