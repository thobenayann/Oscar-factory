/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMovieDetail
// ====================================================

export interface GetMovieDetail_getMovie_categories {
  __typename: "Category";
  id: any;
  label: string;
}

export interface GetMovieDetail_getMovie_imdb {
  __typename: "Imdb";
  Director: string;
  Actors: string;
  Plot: string;
}

export interface GetMovieDetail_getMovie_reviews_user {
  __typename: "User";
  id: any;
  username: string;
}

export interface GetMovieDetail_getMovie_reviews {
  __typename: "Review";
  id: any;
  rating: any;
  content: string | null;
  user: GetMovieDetail_getMovie_reviews_user;
}

export interface GetMovieDetail_getMovie {
  __typename: "Movie";
  image: string;
  title: string;
  categories: GetMovieDetail_getMovie_categories[];
  imdb: GetMovieDetail_getMovie_imdb;
  reviews: GetMovieDetail_getMovie_reviews[];
}

export interface GetMovieDetail {
  /**
   * Récupération d'un film
   */
  getMovie: GetMovieDetail_getMovie | null;
}

export interface GetMovieDetailVariables {
  getMovieId: any;
}
