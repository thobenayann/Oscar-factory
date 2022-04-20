/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllMovies
// ====================================================

export interface GetAllMovies_getAllMovies {
  __typename: "Movie";
  release_year: any;
  title: string;
  image: string;
  id: any;
}

export interface GetAllMovies {
  /**
   * Liste des films
   */
  getAllMovies: GetAllMovies_getAllMovies[];
}
