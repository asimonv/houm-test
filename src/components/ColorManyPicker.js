import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { Box, Checkbox } from '@material-ui/core';

// ----------------------------------------------------------------------

IconColor.propTypes = {
  sx: PropTypes.object
};

function IconColor({ sx, ...other }) {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        display: 'flex',
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'currentColor',
        transition: (theme) =>
          theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest
          }),
        ...sx
      }}
      {...other}
    >
      <Icon icon={checkmarkFill} />
    </Box>
  );
}

ColorManyPicker.propTypes = {
  colors: PropTypes.object.isRequired,
  onChecked: PropTypes.func,
  sx: PropTypes.object
};

export default function ColorManyPicker({ colors, onChecked, sx, ...other }) {
  return (
    <Box sx={sx}>
      {Object.keys(colors).map((key) => {
        const isWhite = colors[key] === '#FFFFFF' || colors[key] === 'white';

        return (
          <Checkbox
            key={colors[key]}
            size="small"
            value={key}
            color="default"
            checked={onChecked(key)}
            icon={
              <IconColor
                sx={{
                  ...(isWhite && {
                    border: (theme) => `solid 1px ${theme.palette.divider}`
                  })
                }}
              />
            }
            checkedIcon={
              <IconColor
                sx={{
                  transform: 'scale(1.4)',
                  '&:before': {
                    opacity: 0.48,
                    width: '100%',
                    content: "''",
                    height: '100%',
                    borderRadius: '50%',
                    position: 'absolute',
                    boxShadow: '4px 4px 8px 0 currentColor'
                  },
                  '& svg': { width: 12, height: 12, color: 'common.white' },
                  ...(isWhite && {
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                    boxShadow: (theme) => `4px 4px 8px 0 ${theme.palette.grey[500_24]}`,
                    '& svg': { width: 12, height: 12, color: 'common.black' }
                  })
                }}
              />
            }
            sx={{
              color: colors[key],
              '&:hover': { opacity: 0.72 }
            }}
            {...other}
          />
        );
      })}
    </Box>
  );
}
