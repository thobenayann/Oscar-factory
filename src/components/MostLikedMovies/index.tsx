import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_FAVORITES } from '../../apollo/queries/getAllFavorites';
import {
    GetAllFavorites,
    GetAllFavorites_getAllFavorites_movie,
    GetAllFavorites_getAllFavorites_user
} from '../../apollo/queries/__generated__/GetAllFavorites';

// components
import Movie from '../MovieList/Movie';

type FavoriteByUser = {
    movie: GetAllFavorites_getAllFavorites_movie;
    user?: Array<GetAllFavorites_getAllFavorites_user>;
}

function MostLikedMovies() {
    // récupération des films qui ont été mis en favoris
    // au chargement initial
    const { loading, data } = useQuery<GetAllFavorites>(GET_ALL_FAVORITES);

    const [favoriteByUser, setFavoriteByUser] = useState<Array<FavoriteByUser>>();

    useEffect(() => {
        // on enleve les duplicas de film dans notre array aec la méthode new Set qui cherche les objets identiques et les suppriment
        // on obtient un tableau de tous les films en favoris sans DOUBLON
        // l'utilisation de Array.from nous permet d'éviter une erreur typescript avec le new Set
        // https://stackoverflow.com/questions/33464504/using-spread-syntax-and-new-set-with-typescript
        const allMovies = [...Array.from(new Set(data?.getAllFavorites.map((favorite: any) => favorite.movie)))];
    
        // on récupère les infos des utilisateurs par rapport à notre array de film en filtrant par l'id d'un film
        // on crée un tout nouveau tableau d'objet avec la méthode map
        // je peux définir les clés de mon objet ici movie et user comme l'original
    
        const mergedInformations = allMovies.map((movie) => {
        return {
            movie,
            // je filtre par movie id de mon array sans doublon (allMovies) et mon array original (date.getAllFavorites)
            // le filtre me retourne un array dans lequel j'ai besoin de quoi ? uniquement les informations des utilisateurs
            user: data?.getAllFavorites.filter((m) => m.movie.id === movie.id).map((m) => m.user),
        }
        });
    
        // j'ajoute mon array avec toutes mes infos dans mon state
        setFavoriteByUser(mergedInformations);
    
    }, [data])

    return (
        <Container component="main" maxWidth="lg">
            <Grid container justifyContent="center">
                <Typography variant="h2" sx={{ mb: 4}}>Liste des films les plus populaires</Typography>
            </Grid>
            <Grid container alignItems="stretch" justifyContent="center">
                { loading && (
                    <CircularProgress />
                    )   
                }
                {
                    favoriteByUser && favoriteByUser.map((favorite: any) => (
                        <Movie key={favorite.movie.id} movieId={favorite.movie.id} movie={favorite.movie} users={favorite.user}/>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default MostLikedMovies;
