import PropTypes from 'prop-types';
// material
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
// components
import FilterSidebar from '~/HOC/FilterSidebar';

export const FILTER_GENDER_OPTIONS = ['Tất cả', 'Nam', 'Nữ'];
export const FILTER_STATUS_OPTIONS = ['Tất cả', 'Đang học', 'Đã tốt nghiệp', 'Đã nghỉ học'];

Filters.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function Filters({ isOpenFilter, onOpenFilter, onCloseFilter }) {
  return (
    <FilterSidebar isOpenFilter={isOpenFilter} onOpenFilter={onOpenFilter} onCloseFilter={onCloseFilter}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Giới tính
          </Typography>
          <RadioGroup>
            {FILTER_GENDER_OPTIONS.map((item) => (
              <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        </div>

        <div>
          <Typography variant="subtitle1" gutterBottom>
            Tình trạng
          </Typography>
          <RadioGroup>
            {FILTER_STATUS_OPTIONS.map((item) => (
              <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        </div>
      </Stack>
    </FilterSidebar>
  );
}
