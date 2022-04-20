/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReviewInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addReview
// ====================================================

export interface addReview_createReview {
  __typename: "Review";
  id: any;
  rating: any;
  content: string | null;
}

export interface addReview {
  /**
   * Ajouter une critique de film
   */
  createReview: addReview_createReview | null;
}

export interface addReviewVariables {
  input?: ReviewInput | null;
}
