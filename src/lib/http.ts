import axios from "axios";

function callAPI() {
  const accessToken = process.env.VUE_APP_GITHUB_ACCESS_TOKEN; // いずれ画面から設定できるように
  const organization = "StudistCorporation";
  const repoName = "teachme_web_duvel";
  const query = `
  {
    viewer {
      id
      login
      avatarUrl
    }
    repository(owner: "${organization}", name: "${repoName}") {
      pullRequests(last: 99, states: [OPEN]) {
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
                  author {
                    ... on User {
                      id
                      avatarUrl
                      login
                    }
                  }
                  state
                  id
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  return axios({
    url: "https://api.github.com/graphql",
    headers: {
      Authorization: `bearer ${accessToken}`,
      Accept: "application/vnd.github.v4.idl",
    },
    method: "POST",
    data: {
      query,
    },
  }).then((res) => res.data);
}

export { callAPI };
