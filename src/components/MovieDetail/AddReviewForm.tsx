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

    const [mutateReview, { error, loading, data }] = useMutation<addReview, addReviewVariables>(ADD_REVIEW, {
        onCompleted: () => {
            refetch()
        }
    })

    console.log(error, data, loading, 'ADD REVIEW');

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
                    // la requete  de saisie d'une review
                    // const config: AxiosRequestConfig = {
                    //     method: 'post',
                    //     url: `${process.env.REACT_APP_OSCAR_API_URL}/api/reviews`,
                    //     headers: {
                    //         'Authorization': `Bearer ${token}`,
                    //         'Content-Type': 'application/json'
                    //     },
                    //     data: {
                    //         movie_id: movieId,
                    //         rating: rating,
                    //         content: content
                    //     }
                    // };

                    // axios(config)
                    //     .then((response) => {
                    //         // que faire une fois que jai posté la review ?

                    //         // viformder les champs
                    //         setRating(5);
                    //         setContent('');

                    //         // probleme : comment afficher la review qui vient d'être postée ?
                    //         // ici il faudrait que je remonte une info au composant parent
                    //         // du genre "eh au fait jai créé une review"
                    //         // pour ca je vais appeler une prop de type fonction
                    //         onReviewAdded(response.data);
                    //     })
                    //     .catch((error) => {
                    //         console.log(error);
                    //     });
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
