import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CATEGORY_DETAIL } from '../../apollo/queries/category';
import { GetCategory } from '../../apollo/queries/__generated__/GetCategory';


function CategoryDetail() {
    const params = useParams();
    const { categoryId, categoryName } = params;

    const { loading, data: movies } = useQuery<GetCategory>(GET_CATEGORY_DETAIL, {
        variables: {
            getCategoryId: categoryId
        }
    })

    const allMovies = movies?.getCategory?.movies;

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Container component="main" maxWidth="lg">
            {/* Liste des film */}
            <Typography variant="h2">Les films de la catégorie {categoryName}</Typography>
            <Grid container alignItems="stretch" justifyContent="center">
                {
                    allMovies?.map((movie) => (
                        <Grid item m={1} xs={12} md={3} key={movie.id} component={Card}>
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
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default CategoryDetail;