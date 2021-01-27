import firebaseInstance from "src/middleware/firebase";
import firebaseApi from "src/middleware/firebaseApi";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import firestoreRefs from "src/middleware/firesoreRefs";
import message from '../functions/showErrorMessage'

const defaultSettings = { lang: "he", mode: "light" };

async function providerLogin(provider) {
  return firebaseInstance.firebase.auth().signInWithPopup(provider).then( async (result) => {
    if (result.additionalUserInfo.isNewUser) {
      const userInfo = {
        user: {
          userName: result.additionalUserInfo.profile.name,
          email: result.additionalUserInfo.profile.email,
          uid : result.user.uid
        },
        settings: defaultSettings
      }
      await firebaseApi.setDocument(await firestoreRefs.userRef(userInfo.user.uid) ,userInfo );
      return userInfo;
    } else {
      //login:
      return  await firebaseApi.getDocument(firestoreRefs.userRef(result.user.uid));
    }
  })
.catch((error) => {
  message.showErrorMessage(error.message)
  });
}

async function passwordLogin(registerUser) {
  return  firebaseInstance.firebase.auth().createUserWithEmailAndPassword(registerUser.email, registerUser.password).then(async (result) =>{
    const user = {
      email: registerUser.email,
      userName: registerUser.userName,
      uid : result.user.uid
    };
    const userInfo = {
      user: user,
      settings: defaultSettings
    };
    await firebaseApi.setDocument(await firestoreRefs.userRef(user.uid) , userInfo);
    return userInfo;
  })
    .catch((error) => {
      message.showErrorMessage(error.message)
  });
}

async function signIn(email , password) {
 return  firebaseInstance.firebase.auth().signInWithEmailAndPassword(email, password).then( async (result) => {
    return await firebaseApi.getDocument(firestoreRefs.userRef(result.user.uid))
  })
    .catch((error) => {
      message.showErrorMessage(error.message)
  });
}

async function resetPassword(email) {
   return  firebaseInstance.firebase.auth().sendPasswordResetEmail(email).then(() => {
     message.showSuccessMessage()
  })
    .catch((error) => {
      message.showErrorMessage(error.message)
  });
}
async  function deleteUser(){
  let user = firebaseInstance.firebase.auth().currentUser;
  await user.delete().then(function() {
  }).catch(function(error) {
    message.showErrorMessage(error.message)
  });
}

export default {
  providerLogin,
  passwordLogin,
  signIn,
  resetPassword,
  deleteUser
};
