/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReviewsByUser
// ====================================================

export interface GetReviewsByUser_getReviewsByUser_movie {
  __typename: "Movie";
  id: any;
  title: string;
}

export interface GetReviewsByUser_getReviewsByUser {
  __typename: "Review";
  id: any;
  rating: any;
  content: string | null;
  movie: GetReviewsByUser_getReviewsByUser_movie;
}

export interface GetReviewsByUser_user {
  __typename: "User";
  username: string;
}

export interface GetReviewsByUser {
  /**
   * Liste des critiques d'un utilisateur
   */
  getReviewsByUser: GetReviewsByUser_getReviewsByUser[];
  /**
   * Récupération d'un utilisateur via son ID
   */
  user: GetReviewsByUser_user | null;
}

export interface GetReviewsByUserVariables {
  userId: any;
}
