import { gql } from "@apollo/client";

export const REMOVE_TO_MY_FAVORITES = gql`
  mutation RemoveToMyFavorites($movieId: PositiveInt) {
    removeToMyFavorites(movie_id: $movieId) {
      id
      title
    }
  }
`;
