import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Menu, Button, MenuItem, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'idDesc', label: 'Id: Desc' },
  { value: 'idAsc', label: 'Id: Asc' },
  { value: 'hpDesc', label: 'HP: High-Low' },
  { value: 'hpAsc', label: 'HP: Low-High' },
  { value: 'attackDesc', label: 'Attack: High-Low' },
  { value: 'attackAsc', label: 'Attack: Low-High' },
  { value: 'defenseAsc', label: 'Defense: High-Low' },
  { value: 'defenseDesc', label: 'Defense: Low-High' },
  { value: 'spAttackDesc', label: 'SP-Atk: High-Low' },
  { value: 'spAttackAsc', label: 'SP-Atk: Low-High' },
  { value: 'spDefDesc', label: 'SP-Def: High-Low' },
  { value: 'spDefAsc', label: 'SP-Def: Low-High' },
  { value: 'speedDesc', label: 'Speed: High-Low' },
  { value: 'speedAsc', label: 'Speed: Low-High' }
];

PokeSort.defaultProps = {
  onSelectFilter: () => {}
};

export default function PokeSort({ onSelectFilter }) {
  const [open, setOpen] = useState(null);
  const [selectedOption, setSelectedOption] = useState(SORT_BY_OPTIONS[1]);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (option) => {
    setOpen(null);
    setSelectedOption(option);
    onSelectFilter(option.value);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {selectedOption.label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selectedOption.value}
            onClick={() => handleClose(option)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
