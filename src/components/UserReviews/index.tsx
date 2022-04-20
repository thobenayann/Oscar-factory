import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { USER_REVIEWS } from '../../apollo/queries/userReviews';
import { GetReviewsByUser } from '../../apollo/queries/__generated__/GetReviewsByUser';

import ReviewCmp from '../Review';

function UserReviews() {
    const { userId } = useParams();

    const { loading, data: reviews } = useQuery<GetReviewsByUser>(USER_REVIEWS, {
        variables: {
            userId,
        }
    });

    console.log(reviews, 'DATA');

    // récupération du user correspondant à l'id dans l'url
    // const urlUser = `${process.env.REACT_APP_OSCAR_API_URL}/api/users/${userId}`;
    // const [user] = useApi<User>(urlUser);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Container component="main" maxWidth="lg">
            {reviews?.getReviewsByUser.length === 0 ? <Typography variant="h3" sx={{ mb: 1 }}>{reviews?.user?.username} n'a pas encore soumis de review</Typography> :
                <Typography variant="h3" sx={{ mb: 1 }}>Toutes les critiques de {reviews?.user?.username}</Typography>}
            {
                reviews?.getReviewsByUser.map((review) => (
                    // dans mon map, je n'oublie pas de donner la key
                    // sur l'élement que je repete.
                    // dans cette key, je donne un id si j'en ai un
                    // ou bien quelque chose le plus unique possible (ca peut etre une string)
                    // cette key permettra a react d'optimiser ses nouveaux rendus
                    // lorsque les données changent
                    <ReviewCmp
                        key={review.id}
                        review={review}
                        // je veux afficher le titre du film
                        titleToDisplay="movieTitle"
                    />
                ))
            }
        </Container>
    )
}

export default UserReviews;