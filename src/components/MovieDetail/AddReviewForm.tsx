import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

import { Rating, Button, TextField, Stack, Card, Typography, Box } from '@mui/material'
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../apollo/mutations/addReview';
import { addReview, addReviewVariables } from '../../apollo/mutations/__generated__/addReview';

type AddReviewFormProps = {
    movieId: number,
    token: string,
    // fonction appelée après le post
    // on lui donnera en parametre le résultat de la requete
    refetch: () => void,
};

function AddReviewForm({ movieId, token, refetch }: AddReviewFormProps) {
    // la note saisie
    const [rating, setRating] = useState(5);
    // le commentaire sur le film
    const [content, setContent] = useState('');

    const [mutateReview] = useMutation<addReview, addReviewVariables>(ADD_REVIEW, {
        onCompleted: () => {
            refetch()
        }
    })

    return (
        <Card elevation={4} sx={{ padding: 2, marginTop: 5 }}>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>Poster votre avis sur le film</Typography>
            <Box
                component="form"
                onSubmit={(event: React.SyntheticEvent) => {
                    event.preventDefault();

                    mutateReview({
                        variables: {
                            input: {
                                movie_id: movieId,
                                content: content,
                                rating: rating,
                            }
                        }
                    });
                }}
            >
                <Stack spacing={2}>
                    <Rating
                        value={rating}
                        onChange={(event, newValue) => {
                            if (newValue !== null) {
                                setRating(newValue);
                            }
                        }}
                    />
                    <TextField
                        placeholder="Votre avis sur le film"
                        value={content}
                        onChange={(event) => {
                            setContent(event.target.value);
                        }}
                    />
                    <Button variant="contained" type="submit">Envoyer</Button>
                </Stack>
            </Box>
        </Card>
    )
}

export default AddReviewForm;
