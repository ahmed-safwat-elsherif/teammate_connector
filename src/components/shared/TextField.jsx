import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@mui/material/TextField';

import { inputBaseClasses } from '@mui/material/InputBase';

const styles = {
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
  },
  [`& .${inputBaseClasses.disabled}`]: {
    background: '#E5EBF0',
  },

  '& .MuiFormHelperText-root.Mui-error': {
    color: theme => theme.palette.error.dark,
    marginTop: 0,
    marginX: 0,
    paddingTop: '2px',
    paddingX: '14px',
    backgroundColor: '#E5EBF0',
  },
  '& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme => theme.palette.error.dark,
  },
};

/**
 * @param {import('@mui/material/TextField').TextFieldProps} props
 * @returns
 */
const TextField = props => {
  const { id, sx, value, type, phoneLangCode, muiValidator, onChange, ...restProps } = props;

  const handleChange = useCallback(
    e => {
      let val = e.target.value;
      if (type === 'number') {
        val = !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : '';
      }

      if (type === 'tel') {
        val = e.target.value.replace(/[^+0-9]/g, '');
      }

      onChange?.({ target: { name: e.target.name, value: val } });
    },
    [onChange, type]
  );

  const commonProps = useMemo(
    () => ({
      ...restProps,
      type,
      value: value || '',
      id,
      inputProps: {
        'data-testid': id,
        ...(restProps.inputProps || {}),
      },
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps: {
        readOnly: restProps.readOnly,
        ...(restProps.InputProps || {}),
      },
      variant: 'outlined',
      size: 'small',
      sx: { ...styles, ...sx },
      onChange: handleChange,
    }),
    [restProps, type, handleChange, id, sx, value]
  );

  return <MuiTextField {...commonProps} />;
};

TextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  sx: PropTypes.shape({}),
  type: PropTypes.oneOf(['text', 'number', 'password', 'tel', 'email']),
  muiValidator: PropTypes.bool,
  phoneLangCode: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  name: '',
  value: '',
  sx: {},
  type: 'text',
  muiValidator: true,
  phoneLangCode: 'FR',
  onChange: null,
};

export default TextField;
