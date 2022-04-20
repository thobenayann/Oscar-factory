/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addToFavorite
// ====================================================

export interface addToFavorite_addToMyFavorites {
  __typename: "Movie";
  id: any;
  title: string;
}

export interface addToFavorite {
  addToMyFavorites: addToFavorite_addToMyFavorites | null;
}

export interface addToFavoriteVariables {
  movieId?: any | null;
}
