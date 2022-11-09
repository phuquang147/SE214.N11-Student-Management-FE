import React, { useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
// component
import Iconify from '~/components/Iconify';

export default function ActionsMenu({ student }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={React.forwardRef((props, ref) => {
            return <RouterLink {...props} ref={ref} state={student} />;
          })}
          to={`${location.pathname}/edit/${student._id}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} color="#339af0" />
          </ListItemIcon>
          <ListItemText primary="Chỉnh sửa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} color="#ff6b6b" />
          </ListItemIcon>
          <ListItemText primary="Xóa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
