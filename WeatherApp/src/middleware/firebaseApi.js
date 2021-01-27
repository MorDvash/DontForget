import firebaseInstance from "./firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import firestoreRefs from "src/middleware/firesoreRefs";


export default {
  setDocument, getDocument, createNewVacation, deleteCollection,
  updateTasks , deleteDocument , updateDocument
}

async function setDocument(ref, data) {
  return await ref.set(data, {merge: true});
}

async function getDocument(ref) {
  const doc = await ref.get();
  return ref._.type === "document" ? doc.data() : doc;
}
async function deleteDocument(ref) {
  ref.delete();
}
async function updateDocument(ref , data) {
  ref.update(data);
}

async function createNewVacation(vacation) {
  const createVacation = await firebaseInstance.firebase.app().functions("europe-west1")
    .httpsCallable("createVacation");
  return await createVacation(vacation)

}

async function deleteCollection(path) {
  const deleteCollection = await firebaseInstance.firebase.app().functions("europe-west1")
    .httpsCallable("deleteCollection");
  return await deleteCollection(path);
}

async function updateTasks(tasksData) {
  const updateTasks = await firebaseInstance.firebase.app().functions("europe-west1")
    .httpsCallable("updateTasks");
  return await updateTasks(tasksData);
}


