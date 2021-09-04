// material
import { Container, Stack, Typography, Skeleton, Box, IconButton, Grid } from '@material-ui/core';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import nextIcon from '@iconify/icons-eva/arrow-forward-outline';
import backIcon from '@iconify/icons-eva/arrow-back-outline';

// components
import Page from '../components/Page';
import { PokeFilterSidebar, PokeList, PokeSort } from '../components/_dashboard/pokemon';

const MAPPED_FILTERS = {
  hpAsc: { index: 0, asc: 1 },
  hpDesc: { index: 0, asc: -1 },
  attackDesc: { index: 1, asc: -1 },
  attackAsc: { index: 1, asc: 1 },
  defenseAsc: { index: 2, asc: 1 },
  defenseDesc: { index: 2, asc: -1 },
  spAttackDesc: { index: 3, asc: -1 },
  spAttackAsc: { index: 3, asc: 1 },
  spDefDesc: { index: 4, asc: -1 },
  spDefAsc: { index: 4, asc: 1 },
  speedDesc: { index: 5, asc: -1 },
  speedAsc: { index: 5, asc: 1 }
};

export default function EcommerceShop() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [fetchingPokemon, setFetchingPokemon] = useState(false);
  const [fetchingError, setFetchingError] = useState();
  const [nextPage, setNextPage] = useState();
  const [count, setCount] = useState();
  const [previousPage, setPreviousPage] = useState();
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();

  const formik = useFormik({
    initialValues: {
      SPAttackRange: '',
      hpRange: '',
      attackRange: '',
      types: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit, values } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleChangeFilter = () => {};

  const handleOnClickPokemonCard = (selectedPokemon) => {
    const { id } = selectedPokemon;
    navigate(`/pokemon/${id}`, {
      state: { selectedPokemon }
    });
  };

  const handleOnClickNextPage = async () => {
    await fetchPokemon(nextPage);
  };

  const handleOnClickPreviousPage = async () => {
    await fetchPokemon(previousPage);
  };

  const sortPokemon = (filter, data) => {
    const sortedPokemon = [...data];
    if (filter === 'idAsc') {
      sortedPokemon.sort((a, b) => a.id - b.id);
    } else if (filter === 'idDesc') {
      sortedPokemon.sort((a, b) => b.id - a.id);
    } else {
      sortedPokemon.sort(
        (a, b) =>
          MAPPED_FILTERS[filter].asc *
          (a.stats[MAPPED_FILTERS[filter].index].base_stat -
            b.stats[MAPPED_FILTERS[filter].index].base_stat)
      );
    }
    return sortedPokemon;
  };

  const handleOnSelectFilter = (filter) => {
    if (filter) {
      const filtered = Object.values(values).some((x) => x !== '');
      const targetArray = filtered ? filteredPokemon : pokemon;
      const sortedPokemon = sortPokemon(filter, targetArray);
      if (filtered) {
        setFilteredPokemon(sortedPokemon);
      } else {
        setPokemon(sortedPokemon);
      }
      setSelectedFilter(filter);
    }
  };

  const fetchPokemon = async (url) => {
    setFetchingPokemon(true);
    try {
      const {
        data: { results, count, previous, next }
      } = await axios.get(url);
      setPreviousPage(previous);
      setNextPage(next);
      setCount(count);
      const pokeList = [];
      for (const pokemon of results) {
        const { url: pokeUrl } = pokemon;
        const { data: pokeData } = await axios.get(pokeUrl);
        pokeList.push(pokeData);
      }
      setFetchingPokemon(false);
      setPokemon(selectedFilter ? sortPokemon(selectedFilter, pokeList) : pokeList);
    } catch (error) {
      setFetchingError(error);
    }
  };

  useEffect(() => {
    const { SPAttackRange, hpRange, attackRange, types } = values;

    if (pokemon) {
      let preprocessedPokemon = [...pokemon];
      // filter types
      if (types.length !== 0) {
        preprocessedPokemon = [
          ...preprocessedPokemon.filter((poke) =>
            types.every((x) => poke.types.map((y) => y.type.name).includes(x))
          )
        ];
      }

      if (hpRange === 'below') {
        preprocessedPokemon = [...preprocessedPokemon.filter((x) => x.stats[0].base_stat < 50)];
      } else if (hpRange === 'between') {
        preprocessedPokemon = [
          ...preprocessedPokemon.filter(
            (x) => x.stats[0].base_stat <= 100 && x.stats[0].base_stat >= 50
          )
        ];
      } else if (hpRange === 'above') {
        preprocessedPokemon = [...preprocessedPokemon.filter((x) => x.stats[0].base_stat > 100)];
      }

      if (attackRange === 'below') {
        preprocessedPokemon = [...preprocessedPokemon.filter((x) => x.stats[1].base_stat < 50)];
      } else if (attackRange === 'between') {
        preprocessedPokemon = [
          ...preprocessedPokemon.filter(
            (x) => x.stats[0].base_stat <= 100 && x.stats[1].base_stat >= 50
          )
        ];
      } else if (attackRange === 'above') {
        preprocessedPokemon = [...preprocessedPokemon.filter((x) => x.stats[1].base_stat > 100)];
      }

      if (SPAttackRange === 'below') {
        preprocessedPokemon = [...preprocessedPokemon.filter((x) => x.stats[2].base_stat < 50)];
      } else if (SPAttackRange === 'between') {
        preprocessedPokemon = [
          ...preprocessedPokemon.filter(
            (x) => x.stats[0].base_stat <= 100 && x.stats[2].base_stat >= 50
          )
        ];
      } else if (SPAttackRange === 'above') {
        preprocessedPokemon = [...preprocessedPokemon.filter((x) => x.stats[2].base_stat > 100)];
      }

      setFilteredPokemon(preprocessedPokemon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    (async () => {
      await fetchPokemon('https://pokeapi.co/api/v2/pokemon');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Poke-houm">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`Pokemon ${count !== undefined ? count : ''}`}
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <PokeFilterSidebar
              formik={formik}
              onChangeFilter={handleChangeFilter}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <PokeSort onSelectFilter={handleOnSelectFilter} />
          </Stack>
        </Stack>

        {fetchingPokemon ? (
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        ) : (
          <>
            {fetchingError ? (
              <Typography variant="h4" sx={{ mb: 5 }}>
                Oops! Something went wrong! Please try again
              </Typography>
            ) : (
              <PokeList
                products={Object.values(values).some((x) => x !== '') ? filteredPokemon : pokemon}
                onClick={handleOnClickPokemonCard}
              />
            )}
          </>
        )}
        <Grid container justifyContent="space-between">
          <Grid item>
            <IconButton disabled={fetchingPokemon} onClick={handleOnClickPreviousPage}>
              <Icon icon={backIcon} width={30} height={30} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton disabled={fetchingPokemon} onClick={handleOnClickNextPage}>
              <Icon icon={nextIcon} width={30} height={30} />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
