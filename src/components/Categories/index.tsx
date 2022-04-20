import { Chip, Grid, Container, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from '../../apollo/queries/allCategories';
import { GetAllCategories } from '../../apollo/queries/__generated__/GetAllCategories';

function CategoriesList() {
    // récupération des catégories au chargement initial
    const { loading, data : categories } = useQuery<GetAllCategories>(GET_ALL_CATEGORIES);

    return (
        <Container>
            <Typography variant="h2" sx={{ mb: 4}}>Liste des catégories</Typography>
            <Grid container spacing={2}>
                { loading && (
                    <CircularProgress />
                    )   
                }
                {
                    categories && categories.getAllCategories.map((category) => (
                        <Grid item key={category.id}>
                            <Chip
                                component={Link}
                                to={`/categories/${category.id}/${category.label}`}
                                size="medium"
                                sx={{
                                    cursor: 'pointer',
                                    boxShadow: 1,
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }}
                                variant="outlined"
                                label={category.label}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default CategoriesList;