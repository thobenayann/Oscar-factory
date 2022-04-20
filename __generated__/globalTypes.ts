/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Données pour ajouter un film à sélection
 */
export interface MovieInput {
  image: string;
  title: string;
  description?: string | null;
  release_year: any;
  imdb_id: string;
  category_ids: number[];
}

/**
 * Données pour ajouter une critique de film
 */
export interface ReviewInput {
  rating: any;
  content?: string | null;
  movie_id: any;
}

/**
 * Les données d'inscription d'un utilisateur
 */
export interface UserInput {
  username: string;
  email: any;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
