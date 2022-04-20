import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
  mutation addMovie($input: MovieInput) {
  createMovie(input: $input) {
    id
    image
    title
    release_year
  }
}
`