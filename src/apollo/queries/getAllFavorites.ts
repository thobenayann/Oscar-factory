import { gql } from "@apollo/client";

export const GET_ALL_FAVORITES = gql`
  query GetAllFavorites {
    getAllFavorites {
      id
      movie {
        id
        title
        image
        release_year
      }
      user {
        id
        username
      }
    }
  }
`;