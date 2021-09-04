import React, { useEffect, useState } from 'react';
import {
  Container,
  CardHeader,
  CardContent,
  Typography,
  ImageList,
  ImageListItem,
  Card,
  Skeleton,
  Box,
  Grid,
  Chip
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { upperFirst } from 'lodash';

import Page from '../components/Page';
import Label from '../components/Label';
import AppCurrentSubject from '../components/_dashboard/app/AppCurrentSubject';
import { pokeColours } from '../data/pokeTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    flexWrap: 'nowrap',
    display: 'flex',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  }
}));

const Pokemon = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [pokemon, setPokemon] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { selectedPokemon } = state || {};
      if (selectedPokemon) {
        setPokemon(selectedPokemon);
      } else {
        try {
          const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          setPokemon(data);
        } catch (error) {
          const {
            response: { status }
          } = error;
          if (status === 404) {
            navigate('/404');
          }
        }
      }
    })();
  }, [id, navigate, state]);

  return (
    <Page title={`${pokemon ? `Poke-houm | ${upperFirst(pokemon.name)}` : 'Loading...'}`}>
      <Container>
        {pokemon ? (
          <>
            <Typography variant="h4" sx={{ mb: 5 }}>
              {upperFirst(pokemon.name)}
            </Typography>
            <Typography component="span" variant="subtitle1">{`#${pokemon.id}`}</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={`${pokemon.name} official artwork`}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <div className={classes.root}>
                      <ImageList className={classes.imageList} cols={3}>
                        {Object.keys(pokemon.sprites).map((key, idx) => {
                          const sprite = pokemon.sprites[key];
                          if (typeof sprite === 'string' && sprite) {
                            return (
                              <ImageListItem key={key}>
                                <img src={pokemon.sprites[key]} alt={key} />
                              </ImageListItem>
                            );
                          }
                          return null;
                        })}
                      </ImageList>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title="Types" />
                      <CardContent>
                        <Grid container spacing={3}>
                          {pokemon.types.map(({ type: { name } }) => (
                            <Grid item xs={6} sm={6} lg={3}>
                              <Chip label={name} style={{ backgroundColor: pokeColours[name] }} />
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title="Info" />
                      <CardContent>
                        <Grid container direction="column">
                          <Grid container justifyContent="space-between">
                            <Grid item>
                              <Typography variant="span" sx={{ mb: 5 }}>
                                Height
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="span" sx={{ mb: 5 }}>
                                {`${parseInt(pokemon.height, 10) * 10} cm`}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid container justifyContent="space-between">
                            <Grid item>
                              <Typography variant="span" sx={{ mb: 5 }}>
                                Weight
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="span" sx={{ mb: 5 }}>
                                {`${parseInt(pokemon.weight, 10) / 100} kg`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <Card>
                  <CardHeader title="Abilities" />
                  <CardContent>
                    <Grid container spacing={3}>
                      {pokemon.abilities.map(({ ability: { name }, is_hidden: isHidden }) => (
                        <Grid item xs={12} sm={6}>
                          <Grid container flexDirection="column">
                            <Grid item>{upperFirst(name)}</Grid>
                            {isHidden && (
                              <Grid item>
                                <Label variant="ghost" color="warning">
                                  Hidden
                                </Label>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppCurrentSubject pokemon={pokemon} />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <Card>
                  <CardHeader title="Appears in" />
                  <CardContent>
                    <Grid container spacing={3}>
                      {pokemon.game_indices.map((x) => (
                        <Grid item xs={12} sm={6}>
                          {upperFirst(x.version.name)}
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <Card>
                  <CardHeader title="Moves" />
                  <CardContent>
                    <Grid container spacing={3}>
                      {pokemon.moves.map((x) => (
                        <Grid item xs={12} sm={6}>
                          {upperFirst(x.move.name)}
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default Pokemon;
