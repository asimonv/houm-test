import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import { Icon } from '@iconify/react';
// material
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@material-ui/core';
import { Form, FormikProvider } from 'formik';
import PropTypes from 'prop-types';
import { pokeColours } from '../../../data/pokeTypes';
import ColorManyPicker from '../../ColorManyPicker';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'hpDesc', label: 'HP: High-Low' },
  { value: 'hpAsc', label: 'HP: Low-High' }
];
export const FILTER_STAT_OPTIONS = [
  { value: 'below', label: 'Below 50' },
  { value: 'between', label: 'Between 50 - 100' },
  { value: 'above', label: 'Above 100' }
];

// ----------------------------------------------------------------------

PokeFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object
};

export default function PokeFilterSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  onChangeFilter,
  formik
}) {
  const { values, getFieldProps, handleChange } = formik;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onChange={onChangeFilter}>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Types
                  </Typography>
                  <ColorManyPicker
                    name="types"
                    colors={pokeColours}
                    onChange={handleChange}
                    onChecked={(color) => values.types.includes(color)}
                    sx={{ maxWidth: 36 * 6 }}
                  />
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    HP
                  </Typography>
                  <RadioGroup {...getFieldProps('hpRange')}>
                    {FILTER_STAT_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={`hp-${item.value}`}
                        control={<Radio />}
                        value={item.value}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Attack
                  </Typography>
                  <RadioGroup {...getFieldProps('attackRange')}>
                    {FILTER_STAT_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={`atk-${item.value}`}
                        control={<Radio />}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    SP-Attack
                  </Typography>
                  <RadioGroup {...getFieldProps('SPAttackRange')}>
                    {FILTER_STAT_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={`sp-atk-${item.value}`}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </Stack>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
