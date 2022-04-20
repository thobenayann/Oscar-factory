import { gql } from "@apollo/client";

export const GET_MOVIE_DETAILS = gql`
  query GetMovieDetail($getMovieId: PositiveInt!) {
  getMovie(id: $getMovieId) {
    image
    title
    categories {
      id
      label
    }
    imdb {
      Director
      Actors
      Plot
    }
    reviews {
      id
      rating
      content
      user {
        id
        username
      }
    }
  }
}
`