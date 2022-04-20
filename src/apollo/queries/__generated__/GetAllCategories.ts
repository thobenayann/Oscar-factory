/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllCategories
// ====================================================

export interface GetAllCategories_getAllCategories {
  __typename: "Category";
  id: any;
  label: string;
}

export interface GetAllCategories {
  /**
   * Liste des catégories
   */
  getAllCategories: GetAllCategories_getAllCategories[];
}
