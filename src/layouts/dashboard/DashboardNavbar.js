import { AppBar, Box, Toolbar, IconButton } from '@material-ui/core';
import { Icon } from '@iconify/react';

// material
import { alpha, styled } from '@material-ui/core/styles';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import PropTypes from 'prop-types';
// components
import { MHidden } from '../../components/@material-extend';
import Searchbar from './Searchbar';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
  onPressSearch: () => {}
};

export default function DashboardNavbar({ onOpenSidebar, onPressSearch }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>
        <Searchbar onPressSearch={onPressSearch} />
        <Box sx={{ flexGrow: 1 }} />
      </ToolbarStyle>
    </RootStyle>
  );
}
