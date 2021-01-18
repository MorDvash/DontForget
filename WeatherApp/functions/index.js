const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const firebase_tools = require("firebase-tools");

admin.initializeApp();

const todos = [
  [
    {nameCollcition: 'SkiEquipment'},
    {nameTask: 'Ski suit' , completed :false},
    {nameTask: 'Ski gloves', completed :false},
    {nameTask: 'Ski boots', completed :false}
  ],
  [
    {nameCollcition: 'clothing'},
    {nameTask: 'Scarf', completed :false},
    {nameTask: 'Guinness', completed :false},
    {nameTask: 'Underpants', completed :false},
  ],
  [
    {nameCollcition: 'BathroomUtensils', completed :false},
    {nameTask: "Bath bag", completed :false},
    {nameTask: "Perfume", completed :false},
    {nameTask: "Deodorant", completed :false},
  ],
  [
    {nameCollcition: 'general', completed :false},
    {nameTask: 'Tissue', completed :false},
    {nameTask: 'Wipes', completed :false},
    {nameTask: 'Sewing Tools', completed :false},
  ],
  [
    {nameCollcition: 'FlightEquipment'},
    {nameTask: 'Passport', completed :false},
    {nameTask: 'Flight ticket', completed :false},
    {nameTask: 'Backpack', completed :false},
  ]
]
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
// const mailTransport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: gmailEmail,
//     pass: gmailPassword,
//   },
// });
// const APP_NAME = 'DontForget'

// exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
//   const email = user.email;
//   const displayName = user.displayName;
//
//   const mailOptions = {
//     from: `${APP_NAME} <noreply@firebase.com>`,
//     to: email,
//   }
//     mailOptions.subject = `Welcome to ${APP_NAME}!`;
//     mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
//     await mailTransport.sendMail(mailOptions);
//     return null;
// });
exports.createVacation = functions.region("europe-west1")
  .https.onCall(async (vacation, context) => {
    const uid = context.auth.uid
    const vacationID = await admin.firestore().collection(`users/${uid}/vacations`).add(vacation);
    await admin.firestore().doc(`users/${uid}/vacations/${vacationID.id}`)
      .set({vacationID: vacationID.id}, {merge: true});
    todos.forEach(todo => {
      todo.forEach(async task => {
        if (task.nameTask) {
          const taskID = await admin.firestore().collection(`users/${uid}/vacations/${vacationID.id}/${todo[0].nameCollcition}`)
            .add(task);
          await admin.firestore().doc(`users/${uid}/vacations/${vacationID.id}/${todo[0].nameCollcition}/${taskID.id}`)
            .set({taskID: taskID.id}, {merge: true});
        }
      })
    })
    vacation.vacationID = vacationID.id
    return vacation
  })

exports.deleteVacation = functions.region("europe-west1").https.onCall(async (vacationId, context) => {
  const uid = context.auth.uid;
  const path = `users/${uid}/vacations/${vacationId}`;
  await firebase_tools.firestore.delete(path, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true
    // token: functions.config().fb.token
  });
});

