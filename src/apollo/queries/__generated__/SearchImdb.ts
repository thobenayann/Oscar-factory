/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchImdb
// ====================================================

export interface SearchImdb_searchImdb {
  __typename: "ImdbSearchItem";
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface SearchImdb {
  /**
   * Recherche des films sur imdb
   */
  searchImdb: SearchImdb_searchImdb[];
}

export interface SearchImdbVariables {
  searchTerm: string;
}
