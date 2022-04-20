/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategory
// ====================================================

export interface GetCategory_getCategory_movies {
  __typename: "Movie";
  id: any;
  image: string;
  title: string;
  release_year: any;
}

export interface GetCategory_getCategory {
  __typename: "Category";
  movies: GetCategory_getCategory_movies[];
}

export interface GetCategory {
  /**
   * Récupération d'une catégorie
   */
  getCategory: GetCategory_getCategory | null;
}

export interface GetCategoryVariables {
  getCategoryId: any;
}
