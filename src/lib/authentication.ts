import * as firebase from 'firebase/app'
import 'firebase/auth'

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

async function authByGitHub() {
  initFirebase()

  const provider = new firebase.auth.GithubAuthProvider()
  provider.addScope('repo, user')

  return firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (result.user) {
        const credential: any = result.credential
        const token: string = credential.accessToken
        return Promise.resolve(token)
      } else {
        firebase.auth().signInWithRedirect(provider)
        return Promise.reject()
      }
    })
}

export { authByGitHub }
