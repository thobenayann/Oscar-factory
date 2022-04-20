import { gql } from "@apollo/client";

export const USER_REVIEWS = gql`
query GetReviewsByUser($userId: PositiveInt!) {
  getReviewsByUser(user_id: $userId) {
    id
    rating
    content
    movie {
      id
      title
    }
  }
  user(id: $userId) {
    username
  }
}
`