import { gql } from "@apollo/client";

export const GET_CATEGORY_DETAIL = gql`
  query GetCategory($getCategoryId: PositiveInt!) {
  getCategory(id: $getCategoryId) {
    movies {
      id
      image
      title
      release_year
    }
  }
}
`;