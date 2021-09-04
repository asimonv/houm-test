// material
import { Box, Card, CardActionArea, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import { pokeColours } from '../../../data/pokeTypes';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

PokeCard.propTypes = {
  product: PropTypes.object
};

export default function PokeCard({ product, onClick }) {
  const {
    name,
    id,
    sprites: { other },
    types
  } = product;

  const { front_default: cover } = other['official-artwork'];

  const colors = types.map(({ type: { name } }) => pokeColours[name]);

  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <ProductImgStyle alt={name} src={cover} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {upperFirst(name)}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview colors={colors} />
            <Typography variant="subtitle1">{`#${id}`}</Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
