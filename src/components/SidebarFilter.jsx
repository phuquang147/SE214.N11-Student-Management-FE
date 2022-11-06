import PropTypes from 'prop-types';
// material
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
// components
import FilterSidebar from '~/HOC/FilterSidebar';

Filters.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function Filters({ isOpenFilter, onOpenFilter, onCloseFilter, filters }) {
  return (
    <FilterSidebar isOpenFilter={isOpenFilter} onOpenFilter={onOpenFilter} onCloseFilter={onCloseFilter}>
      <Stack spacing={3} sx={{ p: 3 }}>
        {filters.map((filter) => (
          <div key={filter.title}>
            <Typography variant="subtitle1" gutterBottom>
              {filter.title}
            </Typography>
            <RadioGroup>
              {filter.items.map((item) => (
                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
              ))}
            </RadioGroup>
          </div>
        ))}
      </Stack>
    </FilterSidebar>
  );
}
