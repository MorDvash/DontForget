import firebaseInstance from '../middleware/firebase'
import {LocalStorage} from 'quasar'

export default async ({router}) => {
  router.beforeEach((to, from, next) => {
    let user = firebaseInstance.firebase.auth().currentUser
    if (user === null) {
      user = localStorage.getItem("user")
    }
    if ((user && to.meta.authNotRequired) || (!user && !to.meta.authNotRequired)) {
      const path = !user ? {name: 'login'} : from
      return next(path)
    }
    next()
  })
}
