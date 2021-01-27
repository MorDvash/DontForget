import firebaseInstance from '../middleware/firebase'
import {LocalStorage} from 'quasar'

export default async ({router}) => {
  window.user = LocalStorage.getItem("user");
  router.beforeEach((to, from, next) => {
    let user = firebaseInstance.firebase.auth().currentUser
    if (user === null) {
      user = LocalStorage.getItem("user");
    }
    if ((user && to.meta.authNotRequired) || (!user && !to.meta.authNotRequired)) {
      const path = !user ? {name: 'login'} : from
      return next(path)
    }
    next()
  })
}
