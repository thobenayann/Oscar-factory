import { useState } from 'react';
import {
    Container,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Alert,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import { useUserContext } from '../../contexts/user';
import { GET_ALL_MOVIES } from '../../apollo/queries/allMovies';
import { GetAllMovies, GetAllMovies_getAllMovies } from '../../apollo/queries/__generated__/GetAllMovies';

// components
import Movie from './Movie';

type DisplaySelection = 'all' | 'favorites' | 'discover';

function MovieList() {
    const { user } = useUserContext();

    // destructuration d'objet + renommage de la clé data en movieData
    const { error, loading, data: movieData } = useQuery<GetAllMovies>(GET_ALL_MOVIES, { fetchPolicy: 'cache-and-network' });

    const [searchText, setSearchText] = useState('');
    const [displaySelection, setDisplaySelection] = useState<DisplaySelection>('all');

    const getFilteredMovies = () => {
        let moviesBySelection;

        // si movieData est vide (encore en chargement) je renvoie un tableau vide
        if (!movieData) {
            return [];
        }

        // pour pas écrire des 10aines de if, on se prépare un tableau de fonction
        // constatons que les clés correspondent aux  différentes valeurs possibles
        // de displaySelection (all, favorites, ou discover)
        // chacune de ces fonctions prend en parametre un tableau de film
        // et renvoie un tableau filtré, ou pas.
        const filterStrategies = {
            'all': (movies: Array<GetAllMovies_getAllMovies>) => movies,
            'favorites': (movies: Array<GetAllMovies_getAllMovies>) => movies.filter((m) => user.myFavorites?.includes(m.id)),
            'discover': (movies: Array<GetAllMovies_getAllMovies>) => movies.filter((m) => !user.myFavorites?.includes(m.id))
        };

        // si je suis pas co, je renvoie tous les film
        if (!user.logged) {
            moviesBySelection = movieData.getAllMovies;
        } else {
            // ici, en faisant filterStrategies[displaySelection] j'obtiens ma fonction de filtrage
            // que j'appelle ensuite "a la volée" en lui donnant ma liste de films
            moviesBySelection = filterStrategies[displaySelection](movieData.getAllMovies);
        }

        return searchText === '' ?
            moviesBySelection :
            moviesBySelection.filter(
                (m) => m.title.toLowerCase().includes(searchText.toLowerCase())
            );
    };

    const moviesToDisplay = getFilteredMovies();

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
            {/* filtrage par favoris ou non */}
            {user.logged && (
                <Grid container justifyContent="center" mb={2}>
                    <Grid item xs={9}>
                        <RadioGroup
                            row
                            value={displaySelection}
                            onChange={(event) => {
                                setDisplaySelection(event.target.value as DisplaySelection);
                            }}
                            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                        >
                            <FormControlLabel value="all" control={<Radio />} label="Tous les films" />
                            <FormControlLabel value="favorites" control={<Radio />} label="Mes favoris" />
                            <FormControlLabel value="discover" control={<Radio />} label="À découvrir" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            )}
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
                    moviesToDisplay && moviesToDisplay?.map((movie: any) => (
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