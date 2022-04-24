
import {
    Paper, Typography, Rating, Link, Stack
} from '@mui/material';
import { Link as RRDLink } from 'react-router-dom';

import { GetMovieDetail_getMovie_reviews as reviewWithMovie } from '../../apollo/queries/__generated__/GetMovieDetail';
import { GetReviewsByUser_getReviewsByUser as reviewWithUser } from '../../apollo/queries/__generated__/GetReviewsByUser';


type ReviewProps = {
    review: reviewWithMovie | reviewWithUser,
    titleToDisplay: 'userName' | 'movieTitle'
}

function Review({ review, titleToDisplay }: ReviewProps) {

    // récupération du user correspondant à al review

    return (
        <Paper sx={{ mb: 2, p: 2 }}>
            {/* soit j'affiche le titre du film... */}
            {
                titleToDisplay === "movieTitle" && (
                    <Typography
                        variant="h5"
                    >
                        {(review as reviewWithUser).movie.title}
                    </Typography>
                )
            }
            {/* soit j'affiche le nom du user et je peux cliquer pour voir toutes ses reviews */}
            {
                titleToDisplay === "userName" && (
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Typography
                            variant="h5"
                        >
                            {(review as reviewWithMovie).user.username}
                        </Typography>
                        <Link variant="body2" component={RRDLink} to={`/user/${(review as reviewWithMovie).user.id}/reviews`}>
                            Voir toutes ses critiques
                        </Link>
                    </Stack>
                )
            }
            <Rating readOnly value={review.rating} />
            <Typography
                variant="body2"
            >
                {review.content}
            </Typography>
        </Paper>
    );
}

export default Review;
