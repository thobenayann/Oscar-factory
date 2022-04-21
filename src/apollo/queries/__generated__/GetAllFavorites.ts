/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllFavorites
// ====================================================

export interface GetAllFavorites_getAllFavorites_movie {
  __typename: "Movie";
  id: any;
  title: string;
  image: string;
  release_year: any;
}

export interface GetAllFavorites_getAllFavorites_user {
  __typename: "User";
  id: any;
  username: string;
}

export interface GetAllFavorites_getAllFavorites {
  __typename: "Favorite";
  id: any;
  movie: GetAllFavorites_getAllFavorites_movie;
  user: GetAllFavorites_getAllFavorites_user;
}

export interface GetAllFavorites {
  /**
   * Récupération des favoris
   */
  getAllFavorites: GetAllFavorites_getAllFavorites[];
}
