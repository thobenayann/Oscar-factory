import { gql } from "@apollo/client";

export const SEARCH_IMBD = gql`
  query SearchImdb($searchTerm: String!) {
  searchImdb(searchTerm: $searchTerm) {
    Poster
    Title
    Type
    Year
    imdbID
  }
}
`;