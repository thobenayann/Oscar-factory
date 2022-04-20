import React, { useState, useEffect, useContext } from 'react';

import {
    Container, Grid, CardMedia, Typography, Stack, Chip, Box, Paper, Rating, TextField, Button, Alert
} from '@mui/material';

import axios, { AxiosError } from 'axios';

import { useParams } from 'react-router';

import useApi from '../../hooks/useApi';

import {
    Category, MovieFromOMDB, MovieFromOscar, Nullable, Review, User
} from '../../types';

import ReviewCmp from '../Review';
import AddReviewForm from './AddReviewForm';
import { useUserContext } from '../../contexts/user';
import { useQuery } from '@apollo/client';
import { GET_MOVIE_DETAILS } from '../../apollo/queries/movieDetails';
import { GetMovieDetail } from '../../apollo/queries/__generated__/GetMovieDetail';
import Favorite from '../Favorites';

function MovieDetail() {
    const { user } = useUserContext();


    // on récupère le paramètre de route dynamique
    // il s 'apelle id mais on le renomme en movieId
    const { id } = useParams();
    const movieId = Number(id);

    const { loading, data, refetch } = useQuery<GetMovieDetail>(GET_MOVIE_DETAILS, {
        variables: {
            getMovieId: movieId
        },
    });

    const movieFromOscar = data?.getMovie;

    // changement du titre de la page
    // si les reviews ont changé, je modifie le titre
    useEffect(() => {
        if (movieFromOscar) {
            console.log('modification du titre');
            document.title = `O'scar - ${movieFromOscar.title} - ${movieFromOscar.reviews.length} critiques`;
        }
    }, [movieFromOscar]); // mon effet ne sera exécuté que si le tableau de reviews ou les infos du film ont changé.

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Container component="main" maxWidth="lg">
            {
                <>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} md={4}>
                            <CardMedia
                                component="img"
                                image={movieFromOscar?.image}
                                alt={movieFromOscar?.title}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ display: 'flex', alignItems: "center", }}>
                                <Typography
                                    variant="h2"
                                >
                                    {movieFromOscar?.title}
                                </Typography>
                                <Favorite movieId={movieId} />
                            </Box>
                            {/* affichage des catégories */}
                            <Stack direction="row" spacing={1}>
                                {
                                    movieFromOscar?.categories.map((category) => (
                                        <Chip key={category.id} label={category.label} variant="outlined" />
                                    ))
                                }
                            </Stack>
                            {/* si extraMovieInfo est plutot vrai.... alors jaffiche du jsx */}

                            <Typography sx={{ my: 2, fontWeight: 'bold' }}>
                                Director : {movieFromOscar?.imdb.Director}
                            </Typography>
                            <Typography sx={{ my: 2, fontWeight: 'bold' }}>
                                Actors : {movieFromOscar?.imdb.Actors}
                            </Typography>
                            <Typography sx={{ my: 2 }}>
                                {movieFromOscar?.imdb.Plot}
                            </Typography>

                        </Grid>
                    </Grid>
                </>
            }
            {/* Affichage des reviews */}
            {/* je verifie que reviews existe avant de mapper dessus */}
            {
                movieFromOscar?.reviews.map((review) => (
                    // je veux afficher le user quia  review le film
                    <ReviewCmp key={review.id} review={review} titleToDisplay="userName" />
                ))
            }
            {/* si je suis connecté, jaffiche le form pour poster une review */}
            {/* je vérifie aussi que j 'ai bien un id de film, et un token, sinon ca marchera pas */}
            {user.logged && movieId && user.token !== undefined && (
                <AddReviewForm
                    movieId={movieId}
                    token={user.token}
                    refetch={refetch}
                />
            )}
        </Container>
    );
}

export default MovieDetail;