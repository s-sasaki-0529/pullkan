import { PR } from '@/models/pr'

export type OrganizedPullRequests = {
  own: PR[]
  requested: PR[]
  inReview: PR[]
  approved: PR[]
}

export type ReviewStatus = 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENTED' | 'DISMISSED' | 'PENDING'
