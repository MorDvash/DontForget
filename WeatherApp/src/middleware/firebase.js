import firebase from "firebase/app";
import "firebase/auth";
const authentication = () => {
  return firebase.auth();
};
/** Convenience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */
const fBInit = config => {
  return firebase.initializeApp(config);
};
export default {
  authentication,
  fBInit,
  firebase
};


