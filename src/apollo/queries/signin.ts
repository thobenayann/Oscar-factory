import { gql } from "@apollo/client";

export const USER_SIGNIN = gql`
query Signin($email: EmailAddress!, $password: String!) {
  signin(email: $email, password: $password) {
    id
    username
    email
    token {
      token
      expiresIn
    }
  }
}
`