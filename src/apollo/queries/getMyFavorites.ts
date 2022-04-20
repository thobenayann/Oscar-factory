import { gql } from "@apollo/client";

export const GET_MY_FAVORITES = gql`
  query GetMyFavoriteMovies {
  getMyFavoriteMovies {
    id
  }
}
`;