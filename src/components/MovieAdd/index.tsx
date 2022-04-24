import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Container, Box, Autocomplete, TextField, Button, Typography, Alert
} from '@mui/material';

import { useUserContext } from '../../contexts/user';

import { MovieResult, Category, Nullable } from '../../types';
import { Navigate } from 'react-router';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { SearchImdb, SearchImdbVariables } from '../../apollo/queries/__generated__/SearchImdb';
import { SEARCH_IMBD } from '../../apollo/queries/searchImdb';
import { GetAllCategories } from '../../apollo/queries/__generated__/GetAllCategories';
import { GET_ALL_CATEGORIES } from '../../apollo/queries/allCategories';
import { ADD_MOVIE } from '../../apollo/mutations/addMovie';
import { addMovie, addMovieVariables } from '../../apollo/mutations/__generated__/addMovie';

function MovieAdd() {
    const { user } = useUserContext();


    // Gestion du film à ajouter
    const [searchPredicate, setSearchPredicate] = useState<string>('');
    const [selectedMovie, setSelectedMovie] = useState<Nullable<MovieResult>>(null);

    // récupération des catégories au chargement initial
    const { data: categoriesData } = useQuery<GetAllCategories>(GET_ALL_CATEGORIES);

    const [searchMovies, { data: searchData }] = useLazyQuery<SearchImdb, SearchImdbVariables>(SEARCH_IMBD, {
        variables: {
            searchTerm: searchPredicate
        }
    });

    const [addMovie, { error }] = useMutation<addMovie, addMovieVariables>(ADD_MOVIE, {
        onCompleted: (data) => {
            navigate(`/movies/${data.createMovie?.id}`);
        }
    })

    // lancement de la recherche au fur et à mesure de la saisie
    useEffect(() => {
        if (searchPredicate !== '') {
            searchMovies();
        }
    }, [searchMovies, searchPredicate]);


    // Gestion des catégories à associer
    const [selectedCategories, setSelectedCategories] = useState<Array<Category>>([]);

    // Gestion de la soumission du formulaire
    const navigate = useNavigate();

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        if (selectedMovie) {

            addMovie({
                variables: {
                    input: {
                        image: selectedMovie?.Poster,
                        title: selectedMovie?.Title,
                        release_year: Number(selectedMovie?.Year),
                        imdb_id: selectedMovie?.imdbID,
                        category_ids: selectedCategories.map((category) => category.id),
                    }
                }
            })
        }
    }

    // redirection si user non loggé
    if (!user.logged) return <Navigate to="/" />;

    return (
        <Container maxWidth="md">

            <Typography variant="h1">
                Add a new Movie
            </Typography>

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}

                component="form"
                onSubmit={handleSubmit}
            >
                {error && <Alert severity="error">{error.message || error.graphQLErrors}</Alert>}
                <Autocomplete
                    options={searchData?.searchImdb ?? []}
                    // champ controlé de la partie recherche
                    inputValue={searchPredicate}
                    onInputChange={(event, value) => {
                        setSearchPredicate(value);
                    }}
                    // champ controlé de la partie selection
                    value={selectedMovie}
                    onChange={(event, value) => {
                        setSelectedMovie(value);
                    }}
                    getOptionLabel={(option) => option.Title}
                    renderOption={(props, option, state) => {
                        return <li {...props} key={option.imdbID}>{option.Title}</li>
                    }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                    fullWidth
                    sx={{
                        my: 2,
                    }}
                />

                {categoriesData && <Autocomplete
                    multiple
                    options={categoriesData.getAllCategories}
                    getOptionLabel={(category) => category.label}
                    value={selectedCategories as any}
                    onChange={(event, value) => {
                        setSelectedCategories(value);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Categories"
                            placeholder="Categories"
                        />
                    )}
                    fullWidth
                    sx={{
                        my: 2,
                    }}
                />}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add movie
                </Button>

            </Box>
        </Container>
    );
}

export default MovieAdd;

