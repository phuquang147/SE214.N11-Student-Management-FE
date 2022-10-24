import PropTypes from 'prop-types';
// material
import { Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import Scrollbar from '~/components/Scrollbar';

FilterSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function FilterSidebar({ children, isOpenFilter, onOpenFilter, onCloseFilter }) {
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Bộ lọc&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 300, border: 'none', overflow: 'hidden', display: 'flex' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Bộ lọc
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />
        <Scrollbar>{children}</Scrollbar>
        <Divider />

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 3 }}>
          <Button
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Đặt lại
          </Button>
          <Button size="large" type="submit" color="primary" variant="contained">
            Xác nhận
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
