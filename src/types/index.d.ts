import { PR } from '@/models/pr'

type ORGANIZED_PULL_REQUESTS = {
  own: PR[]
  requested: PR[]
  inReview: PR[]
  approved: PR[]
}

type REVIEW_STATUS = 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENTED' | 'DISMISSED' | 'PENDING'
