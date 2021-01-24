import firebaseInstance from "./firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import firestoreRefs from "src/middleware/firesoreRefs";


export default {
  setDocument, getDocument, createNewVacation, DeleteVacationFunction,
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

async function DeleteVacationFunction(vacationId) {
  const deleteVacation = await firebaseInstance.firebase.app().functions("europe-west1")
    .httpsCallable("deleteVacation");
  return await deleteVacation(vacationId);
}

async function updateTasks(tasksData) {
  const updateTasks = await firebaseInstance.firebase.app().functions("europe-west1")
    .httpsCallable("updateTasks");
  return await updateTasks(tasksData);
}

