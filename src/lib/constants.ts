// TODO: constantsでなくtypesかな

import { PR } from '@/models/pr';

export type ORGANIZED_PULL_REQUESTS = {
  own: PR[]
  requested: PR[]
  inReview: PR[]
  approved: PR[]
}

export type REVIEW_STATUS =
  | "APPROVED"
  | "CHANGES_REQUESTED"
  | "COMMENTED"
  | "DISMISSED"
  | "PENDING";
