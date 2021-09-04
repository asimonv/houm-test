import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import PokeCard from './PokeCard';

// ----------------------------------------------------------------------

PokeList.propTypes = {
  products: PropTypes.array.isRequired,
  onClick: () => {}
};

export default function PokeList({ products, onClick, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <PokeCard product={product} onClick={() => onClick(product)} />
        </Grid>
      ))}
    </Grid>
  );
}
