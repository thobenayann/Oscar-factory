import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CircularProgress, Alert } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { GET_CATEGORY_DETAIL } from '../../apollo/queries/category';
import { GetCategory } from '../../apollo/queries/__generated__/GetCategory';

import defaultImage from '../../assets/cinema-default-img.jpg';

function CategoryDetail() {
    const params = useParams();
    
    // récupération de la categorie et des films associés
    const { loading, data : category } = useQuery<GetCategory>(GET_CATEGORY_DETAIL, {
        variables: { getCategoryId: params.categoryId },
    });
    const movies = category ? category.getCategory?.movies : null;

    return (
        <Container component="main" maxWidth="lg">
            {/* Liste des film */}
            <Typography variant="h2">Les films de la catégorie {params.categoryName}</Typography>
            <Grid container alignItems="stretch" justifyContent="center">
                { loading && (
                    <CircularProgress />
                    )   
                }
                {
                    category && movies && movies.map((movie: any) => (
                        <Grid item m={1} xs={12} md={3} key={movie.id} component={Card}>
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
                {
                    category && movies && movies.length < 1 && (
                        <Alert sx={{ mt: 8}} severity="info">Il n'y pas encore de films dans cette categorie</Alert>
                    )
                }
            </Grid>
        </Container>
    );
}

export default CategoryDetail;