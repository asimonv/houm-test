import { AppBar, Box, Toolbar } from '@material-ui/core';
// material
import { alpha, styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// components
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
        <Searchbar onPressSearch={onPressSearch} />
        <Box sx={{ flexGrow: 1 }} />
      </ToolbarStyle>
    </RootStyle>
  );
}
