import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

/**
 * TODO: 全面的に認証を整理する
 * - ユーザインタラクションに基づいてサインイン、サインアウトする
 * - GitHub API token の扱いをちゃんとする
 */

function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyDOycQ_8kEQFgO1VMQ5XFx1EOcE91zgaBg',
    authDomain: 'pullkan.firebaseapp.com',
    databaseURL: 'https://pullkan.firebaseio.com',
    projectId: 'pullkan',
    storageBucket: 'pullkan.appspot.com',
    messagingSenderId: '686984609709',
    appId: '1:686984609709:web:d4508cf78b8941a322eb24'
  })
}

async function fetchGitHubToken() {
  const user = firebase.auth().currentUser
  if (!user) return Promise.reject()

  const docRef = await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
  const doc = await docRef.get()
  return doc.data()?.token as string
}

async function authByGitHub() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        resolve()
      } else {
        const provider = new firebase.auth.GithubAuthProvider()
        provider.addScope('repo, user')
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            const credential = result.credential as any
            const accessToken = credential?.accessToken
            const uid = result.user?.uid

            if (accessToken && uid) {
              console.log({ accessToken, uid })
              resolve()
            } else {
              reject()
            }
          })
      }
    })
  })
}

initFirebase()
export { authByGitHub, fetchGitHubToken }
