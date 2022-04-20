import { gql } from "@apollo/client";

export const ADD_TO_MY_FAVORITES = gql`
  mutation addToFavorite($movieId: PositiveInt) {
  addToMyFavorites(movie_id: $movieId) {
    id
    title
  }
}
`;