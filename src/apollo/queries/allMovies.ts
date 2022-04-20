import { gql } from "@apollo/client";

export const GET_ALL_MOVIES = gql`
    query GetAllMovies {
        getAllMovies {
            release_year
            title
            image
            id
        }
    } 
`;