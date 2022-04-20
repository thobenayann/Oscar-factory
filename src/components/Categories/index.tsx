import { Chip, Grid, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GetAllCategories } from '../../apollo/queries/__generated__/GetAllCategories';
import { GET_ALL_CATEGORIES } from '../../apollo/queries/allCategories';

function CategoriesList() {
    // récupération des catégories au chargement initial

    const { loading, data: categories } = useQuery<GetAllCategories>(GET_ALL_CATEGORIES);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Container>
            <Typography variant="h2" sx={{ mb: 2 }}>Liste des catégories</Typography>
            <Grid container spacing={2}>
                {
                    categories && categories?.getAllCategories.map((category) => (
                        <Grid item key={category.id}>
                            <Chip
                                component={Link}
                                to={`/categories/${category.id}/${category.label}`}
                                size="medium"
                                sx={{
                                    cursor: 'pointer'
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