import loginFuncs from "src/middleware/loginFuncs";
import firebaseInstance from "../../middleware/firebase";
import {LocalStorage , Loading} from 'quasar'


export default {
  passwordRegister: async ({commit, dispatch}, user) => {
    Loading.show()
    const userInfo = await loginFuncs.passwordLogin(user);
    commit('insertState', userInfo)
  },
  userLogin: async ({commit, dispatch}, user) => {
    switch (user.provider) {

      case 'FacebookAuth' : {
        const provider = await new firebaseInstance.firebase.auth.FacebookAuthProvider();
        const userInfo = await loginFuncs.providerLogin(provider);
          commit('insertState', userInfo)
        return
      }
      case 'GoogleAuth' : {
        const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
        const userInfo = await loginFuncs.providerLogin(provider);
          commit('insertState', userInfo)
        return
      }
      case 'signAuth' : {
        Loading.show()
        const userInfo = await loginFuncs.signIn(user.email, user.password);
          commit('insertState', userInfo)
        return
      }
    }
  },
  forgetPassword: async ({commit}, email) => {
      await loginFuncs.resetPassword(email);
  },
  handleAuthStateChanged: async () => {
    firebaseInstance.firebase.auth().onAuthStateChanged(user => {
        Loading.hide()
        LocalStorage.set('user', user)
      })
  },
  signOut: async () => {
    await firebaseInstance.firebase.auth().signOut()
   await localStorage.removeItem('user')
  },
}

