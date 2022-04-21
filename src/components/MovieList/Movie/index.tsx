import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../../../contexts/user';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Container,
    Chip
} from '@mui/material';
import { MovieFromOscar } from '../../../types';
import { GetAllFavorites_getAllFavorites_user } from '../../../apollo/queries/__generated__/GetAllFavorites';
import Favorite from '../../Favorites';
import defaultImage from '../../../assets/cinema-default-img.jpg';

type MovieProps = {
    movie: MovieFromOscar
    movieId: number
    users?: Array<GetAllFavorites_getAllFavorites_user>
}

function Movie({ movie, movieId, users }: MovieProps) {

    const {user} = useUserContext();
    const location = useLocation();

    return (
        <Grid item m={1} xs={12} md={3} key={movie.id} component={Card} style={{ position: "relative" }}>
            <CardActionArea
                component={Link}
                to={`/movies/${movie.id}`}
            >
                <CardMedia
                    component="img"
                    image={(movie.image !== 'N/A') ? movie.image : defaultImage}
                    alt={movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.release_year}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {
                user.logged && (
                    <Favorite movieId={movieId} style />
                )
            }
            {
                (location.pathname === '/most-liked-movies') && (
                    <CardActions>
                        <Grid>
                            <Typography gutterBottom variant="subtitle1" component="h3">
                                Ces utilisateurs ont aimés ce film :
                            </Typography>
                            <Container>
                                {
                                    users && users.map((user) => (
                                        <Chip key={user.id} label={user.username} />
                                    ))
                                }
                            </Container>
                        </Grid>
                    </CardActions>
                )
            }
        </Grid>
    );
}

export default Movie;
