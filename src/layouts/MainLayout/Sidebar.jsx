import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { selectUser } from '~/redux/infor';
// material
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '~/hooks/useResponsive';
// components
import Logo from '~/components/Logo';
import Scrollbar from '~/components/Scrollbar';
import NavSection from '~/layouts/MainLayout/NavSection';
//
import navConfig from './NavConfig';
import { HOMEROOM_TEACHER, STAFF, SUBJECT_TEACHER } from '~/constants/roles';
const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);

  let updatedNavConfig;

  if (user?.role?.name === SUBJECT_TEACHER || user?.role?.name === HOMEROOM_TEACHER) {
    updatedNavConfig = navConfig.filter(
      (item) => item.title !== 'dashboard' && item.title !== 'Nhân viên' && item.title !== 'Giáo viên',
    );
  }

  if (user?.role?.name === STAFF) {
    updatedNavConfig = navConfig.filter((item) => item.title !== 'Điểm số');
  }

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar
              src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              alt="photoURL"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user?.role?.name}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={updatedNavConfig || navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
