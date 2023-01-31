// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';

export default function RHFAutocomplete({ name, label, handleChange, defaultValue, ...other }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={other.options && other.options.length > 0 ? other.options[0] : null}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            value={field.value}
            fullWidth
            disableClearable
            onChange={(e, value) => {
              setValue(name, value);
              if (handleChange) handleChange(value);
            }}
            renderInput={(params) => <TextField {...params} label={label} />}
            {...other}
          />
        );
      }}
    />
  );
}
