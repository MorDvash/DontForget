import firebaseInstance from "src/middleware/firebase";
import {LocalStorage} from "quasar";

export default async () => {
  // const config = process.env.environments.FIREBASE_CONFIG
  const config = {
    apiKey: "AIzaSyDzSkNwGvAkeLqQkMiyJQqrbEjPF5xr1VU",
    authDomain: "dontforget-9e23d.firebaseapp.com",
    projectId: "dontforget-9e23d",
    storageBucket: "dontforget-9e23d.appspot.com",
    messagingSenderId: "810613791493",
    appId: "1:810613791493:web:dd843129fbb3316baeb56c",
    measurementId: "G-VYLZP5CMGL"
  };

  firebaseInstance.fBInit(config);
  // Validation that our service structure is working
  // with a firebase app instance. Does not validate a
  // valid API key.
};
