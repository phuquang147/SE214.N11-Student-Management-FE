import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
};

export default function RHFAutocomplete({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            value={field.value || other.options[0]}
            fullWidth
            disableClearable
            onChange={(e, value) => {
              field.onChange(value);
            }}
            renderInput={(params) => <TextField {...params} label={other.label} value={field.value} />}
            {...other}
          />
        );
      }}
    />
  );
}
