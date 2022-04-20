/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signup {
  __typename: "User";
  id: any;
  username: string;
}

export interface Signup {
  /**
   * Inscription
   */
  signup: Signup_signup | null;
}

export interface SignupVariables {
  input?: UserInput | null;
}
