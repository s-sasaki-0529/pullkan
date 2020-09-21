/**
 * GithubAPIを直接叩くモジュール
 */
import axios from 'axios'

function callGithubAPI(query: String) {
  const token = sessionStorage.getItem('token')
  if (token === null) {
    throw new Error('Calling the GitHub API without a token')
  }

  return axios({
    url: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${token}`,
      Accept: 'application/vnd.github.v4.idl'
    },
    method: 'POST',
    data: {
      query
    }
  }).then(res => res.data)
}

function callCurrentUser() {
  return callGithubAPI(`
  {
    viewer {
      id
      login
      avatarUrl
      repositoriesContributedTo(first: 99) {
        nodes {
          id
          name
          owner {
            ... on Organization {
              id
              login
            }
            ... on User {
              id
              login
            }
          }
        }
      }
    }
  }
  `)
}

function callPullRequests() {
  const organization = 'StudistCorporation'
  const repoName = 'teachme_web_duvel'
  return callGithubAPI(`
  {
    repository(owner: "${organization}", name: "${repoName}") {
      pullRequests(last: 100, states: [OPEN]) {
        edges {
          node {
            id
            title
            url
            author {
              ... on User {
                id
                avatarUrl
                login
              }
            }
            reviewRequests(first: 99) {
              edges {
                node {
                  requestedReviewer {
                    ... on User {
                      id
                      name
                      avatarUrl
                      login
                    }
                  }
                }
              }
            }
            reviews(first: 99) {
              edges {
                node {
                  state
                  id
                  createdAt
                  author {
                    ... on User {
                      id
                      avatarUrl
                      login
                    }
                  }
                }
              }
            }
            commits(last: 1) {
              nodes {
                commit {
                  committedDate
                }
              }
            }
            labels(first: 99) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  }
  `)
}

export { callCurrentUser, callPullRequests }
