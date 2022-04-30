/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveToMyFavorites
// ====================================================

export interface RemoveToMyFavorites_removeToMyFavorites {
  __typename: "Movie";
  id: any;
  title: string;
}

export interface RemoveToMyFavorites {
  removeToMyFavorites: RemoveToMyFavorites_removeToMyFavorites | null;
}

export interface RemoveToMyFavoritesVariables {
  movieId?: any | null;
}
