import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
};

export default function RHFAutocomplete({ name, ...other }) {
  const { control } = useFormContext();
  const [value, setValue] = useState(other.options[0] || other.text);

  useEffect(() => {
    setValue(other.text);
  }, [other.text]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            value={value || other.options[0]}
            defaultValue={value || other.text}
            fullWidth
            disableClearable
            onChange={(e, value) => {
              setValue(value);
              field.onChange(value);
            }}
            renderInput={(params) => <TextField {...params} label={other.label} />}
            {...other}
          />
        );
      }}
    />
  );
}
