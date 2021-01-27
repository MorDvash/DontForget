import loginFuncs from "src/middleware/loginFuncs";
import firebaseInstance from "../../middleware/firebase";
import firebaseApi from "src/middleware/firebaseApi";
import {Loading, LocalStorage} from 'quasar'


export default {
  passwordRegister: async ({commit, dispatch}, user) => {
    Loading.show()
    const userInfo = await loginFuncs.passwordLogin(user);
    commit('insertState', userInfo)
  },
  userLogin: async ({commit, dispatch}, user) => {
    let userInfo = {}
    if (user.provider === 'FacebookAuth') {
      const provider = await new firebaseInstance.firebase.auth.FacebookAuthProvider();
      userInfo = await loginFuncs.providerLogin(provider);
    }
    if (user.provider === 'GoogleAuth') {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      userInfo = await loginFuncs.providerLogin(provider);
    }
    if (user.provider === 'signAuth') {
      Loading.show()
      userInfo = await loginFuncs.signIn(user.email, user.password);
    }
    commit('insertState', userInfo)
    dispatch('saveToLocalStorage', {state: userInfo.user, nameState: 'user'})
    dispatch('saveToLocalStorage', {state: userInfo.settings, nameState: 'settings'})
  },
  forgetPassword: async ({commit}, email) => {
    await loginFuncs.resetPassword(email);
  },
  deleteUser: async ({dispatch, state}) => {
    firebaseApi.deleteCollection(`users/${state.user.uid}`)
    await loginFuncs.deleteUser()
    await dispatch('resetState')
  },
  signOut: async ({dispatch}) => {
    await firebaseInstance.firebase.auth().signOut()
    await dispatch('resetState')
  },
  resetState: async ({commit}) => {
    await commit('insertFotterStatus', 'mainLayOut')
    await commit("vacations/resetStateTask", null, {root: true});
    await commit("vacations/resetStateVacations", null, {root: true});
    await localStorage.removeItem('user')
  },
  changeLang: async ({state, commit, dispatch}, lang) => {
    await commit('changeLang', lang)
    dispatch('saveToLocalStorage', {state: state.settings, nameState: 'settings'})
  },
  saveToLocalStorage: async ({state}, data) => {
    LocalStorage.set(data.nameState, data.state)
  },
  getFromLocalStorage: async ({commit}, key) => {
    let dataFromLocalStorage = LocalStorage.getItem(key)
    if (dataFromLocalStorage) {
      commit('insertStateFronLocalStorage', {value: dataFromLocalStorage, stateName: key})
    }
  },
  fotterStatus: async ({commit, dispatch , state}, nameState) => {
    commit('insertFotterStatus', nameState)
    dispatch('saveToLocalStorage', {state: state[nameState], nameState: nameState})
  }
}

