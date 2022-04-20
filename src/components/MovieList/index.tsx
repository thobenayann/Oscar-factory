import { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    TextField,
    Typography,
    Button
} from '@mui/material';

import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import { useUserContext } from '../../contexts/user';
import { GET_ALL_MOVIES } from '../../apollo/queries/allMovies';
import { GetAllMovies } from './__generated__/GetAllMovies';
import Favorite from '../Favorites';

function MovieList() {
    const { user } = useUserContext();

    // destructuration d'objet + renommage de la clé data en movieData
    const { error, loading, data: movieData } = useQuery<GetAllMovies>(GET_ALL_MOVIES, { fetchPolicy: 'cache-and-network' });

    console.log('retour GRAPHQL : ', movieData, error, loading);

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

    // // changement du titre de la page
    // // si les films ont changé, je modifie le titre
    // useEffect(() => {
    //     if (movies !== null) {
    //         console.log('modification du titre');
    //         document.title = `O'scar - ${movies.length} films`;
    //     }
    // }, [movies]); // mon effet ne sera exécuté que si le tableau de films a changé.


    if (loading) {
        return <h1>Loading...</h1>
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
                {
                    moviesToDisplay?.map((movie: any) => (
                        <Grid item m={1} xs={12} md={3} key={movie.id} component={Card} style={{ position: "relative" }}>
                            <CardActionArea
                                component={Link}
                                to={`/movies/${movie.id}`}
                            >
                                <CardMedia
                                    component="img"
                                    image={movie.image}
                                    alt={movie.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {movie.release_year}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Favorite movieId={movie.id} style />
                        </Grid>
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