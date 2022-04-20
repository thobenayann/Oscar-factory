/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MovieInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addMovie
// ====================================================

export interface addMovie_createMovie {
  __typename: "Movie";
  id: any;
  image: string;
  title: string;
  release_year: any;
}

export interface addMovie {
  /**
   * Ajout d'un film à la sélection
   */
  createMovie: addMovie_createMovie | null;
}

export interface addMovieVariables {
  input?: MovieInput | null;
}
