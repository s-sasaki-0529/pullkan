import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

/**
 * Firebaseを初期化
 * 本ツールでは、GitHubによるOAuth認証及びAPIトークンの永続化にFirebaseを用いる
 */
firebase.initializeApp({
  apiKey: 'AIzaSyDOycQ_8kEQFgO1VMQ5XFx1EOcE91zgaBg',
  authDomain: 'pullkan.firebaseapp.com',
  databaseURL: 'https://pullkan.firebaseio.com',
  projectId: 'pullkan',
  storageBucket: 'pullkan.appspot.com',
  messagingSenderId: '686984609709',
  appId: '1:686984609709:web:d4508cf78b8941a322eb24'
})

/**
 * トークンを管理しているコレクションへの参照
 */
const USERS_REF = firebase.firestore().collection('users')

/**
 * ログイン中ユーザのAPIトークンを取得する
 */
async function loadGitHubToken() {
  const user = firebase.auth().currentUser
  if (!user) return Promise.reject()

  return USERS_REF.doc(user.uid)
    .get()
    .then(doc => doc.data()?.token)
}

/**
 * ログイン中ユーザのAPIトークンを永続化する
 */
function saveGitHubToken(uid: string, token: string) {
  return USERS_REF.doc(uid).set({ token })
}

async function authenticate() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        resolve()
      } else {
        const provider = new firebase.auth.GithubAuthProvider()
        provider.addScope('repo, user, read:org')
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            const credential = result.credential as any
            const token = credential?.accessToken
            const uid = result.user?.uid
            if (uid && token) {
              return saveGitHubToken(uid, token)
            }
          })
      }
    })
  })
}

export { authenticate, loadGitHubToken }
