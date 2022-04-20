/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Signin
// ====================================================

export interface Signin_signin_token {
  __typename: "Token";
  token: string;
  expiresIn: string;
}

export interface Signin_signin {
  __typename: "UserConnected";
  id: any;
  username: string;
  email: any;
  token: Signin_signin_token | null;
}

export interface Signin {
  /**
   * Authentification
   */
  signin: Signin_signin | null;
}

export interface SigninVariables {
  email: any;
  password: string;
}
