import firebaseInstance from "./firebase";
import firebaseApi from "src/middleware/firebaseApi";

export default {
  userRef,vacationsRef ,tasksRef , taskRef
}
function userRef(uid) {
  if (!uid) {
    uid = window.user.uid;
  }
  return firebaseInstance.firebase.firestore()
    .doc(`users/${uid}`);
}
function vacationsRef(uid){
  if (!uid) {
    uid = window.user.uid;
  }
  return firebaseInstance.firebase.firestore()
    .collection(`users/${uid}/vacations`);
}
function tasksRef(data, uid){
  if (!uid) {
    uid = window.user.uid;
  }
  return firebaseInstance.firebase.firestore()
    .collection(`users/${uid}/vacations/${data.id}/${data.key}`);
}
function taskRef(data, uid){
  if (!uid) {
    uid = window.user.uid;
  }
  return firebaseInstance.firebase.firestore()
    .doc(`users/${uid}/vacations/${data.nameTasks.id}/${data.nameTasks.key}/${data.task.taskID}`);
}

