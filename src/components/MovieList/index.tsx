import { useState } from 'react';
import {
    Container,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import { useUserContext } from '../../contexts/user';
import { GET_ALL_MOVIES } from '../../apollo/queries/allMovies';
import { GetAllMovies } from './__generated__/GetAllMovies';

// components
import Movie from './Movie';

function MovieList() {
    const { user } = useUserContext();

    // destructuration d'objet + renommage de la clé data en movieData
    const { error, loading, data: movieData } = useQuery<GetAllMovies>(GET_ALL_MOVIES, { fetchPolicy: 'cache-and-network' });

    const [searchText, setSearchText] = useState('');

    let moviesToDisplay;

    // si j'ai tapé quelque chose dans ma rechercher
    if (searchText !== '' && movieData?.getAllMovies !== null) {
        // je vais filtrer mes films
        moviesToDisplay = movieData?.getAllMovies.filter((movie: any) => movie.title.toLowerCase().includes(searchText.toLowerCase()));
    } else {
        // j'affiche tous les films
        moviesToDisplay = movieData ? movieData.getAllMovies : [];
    }

    return (
        <Container component="main" maxWidth="lg">
            {/* Bouton ajout d'un film */}
            {
                user.logged && (
                    <Grid container justifyContent="end" mb={4}>
                        <Grid item>
                            <Button variant="contained" component={Link} to="/movies/add" sx={{ float: 'right' }}>Add a movie</Button>
                        </Grid>
                    </Grid>
                )
            }
            {/* mon champ controlé */}
            <Grid container justifyContent="center" mb={2}>
                <Grid item xs={9}>
                    <TextField
                        sx={{ width: '100% ' }}
                        label="Chercher dans la liste"
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                    />
                </Grid>
            </Grid>
            {/* Liste des film */}
            <Grid container alignItems="stretch" justifyContent="center">
                { loading && (
                    <CircularProgress />
                    )   
                }
                {error && <Alert severity="error">{error.message || error.graphQLErrors}</Alert>}
                {
                    moviesToDisplay?.map((movie: any) => (
                        <Movie key={movie.id} movie={movie} movieId={movie.id}/>
                    ))
                }
            </Grid>
            {/* Bouton ajout d'un film */}
            {
                user.logged && (
                    <Grid container justifyContent="end" mb={4}>
                        <Grid item>
                            <Button variant="contained" component={Link} to="/movies/add" sx={{ float: 'right' }}>Add a movie</Button>
                        </Grid>
                    </Grid>
                )
            }
        </Container>
    );
}

export default MovieList;