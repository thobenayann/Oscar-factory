import { gql } from "@apollo/client";

export const ADD_REVIEW = gql`
mutation addReview($input: ReviewInput) {
  createReview(input: $input) {
    id
    rating
    content
  }
}`;