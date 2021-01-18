import firebaseInstance from "./firebase";
import firebaseApi from "src/middleware/firebaseApi";

export default {
  userRef,vacationsRef ,taskRef
}
function userRef(uid) {
  return firebaseInstance.firebase.firestore().doc(`users/${uid}`);
}

function vacationsRef(uid){
  return firebaseInstance.firebase.firestore().collection(`users/${uid}/vacations`);
}
function taskRef(dataTask, uid){
  return firebaseInstance.firebase.firestore().collection(`users/${uid}/vacations/${dataTask.id}/${dataTask.key}`);
}

