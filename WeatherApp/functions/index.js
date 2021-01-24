const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const firebase_tools = require("firebase-tools");

admin.initializeApp();

const todos = [
  [
    {nameCollcition: 'SkiEquipment'},
    {nameTask: 'Ski suit' , completed :false},
    {nameTask: 'Snowboard/Ski' , completed :false},
    {nameTask: 'Ski gloves', completed :false},
    {nameTask: 'Ski boots', completed :false},
    {nameTask: 'Helmet', completed :false},
    {nameTask: 'Ski goggles', completed :false},
    {nameTask: 'Surfing bag with water dispenser', completed :false},
    {nameTask: 'Thermal pants', completed :false},
    {nameTask: 'Thermal shirts', completed :false},
    {nameTask: 'Thermal socks', completed :false},
    {nameTask: 'Thermal face mask', completed :false},
    {nameTask: 'Headphones for surfing + charger', completed :false},
    {nameTask: 'Batteries', completed :false},
    {nameTask: 'Walkie-Talkie', completed :false},
    {nameTask: 'Extreme camera', completed :false},
  ],
  [
    {nameCollcition: 'clothing'},
    {nameTask: 'Scarf', completed :false},
    {nameTask: 'Guinness', completed :false},
    {nameTask: 'Underpants', completed :false},
    {nameTask: 'Sleeping shorts', completed :false},
    {nameTask: 'Sleeping T-shirt', completed :false},
    {nameTask: 'Sleeping T-shirt', completed :false},
    {nameTask: 'knitwear', completed :false},
    {nameTask: 'T-shirts', completed :false},
    {nameTask: 'Long shirts', completed :false},
    {nameTask: 'Swimsuit', completed :false},
    {nameTask: 'Slippers', completed :false},
    {nameTask: 'Sunglasses', completed :false},
  ],
  [
    {nameCollcition: 'BathroomUtensils', completed :false},
    {nameTask: "Bath bag", completed :false},
    {nameTask: "Perfume", completed :false},
    {nameTask: "Deodorant", completed :false},
    {nameTask: "Shampoo", completed :false},
    {nameTask: 'Toothpaste', completed :false},
    {nameTask: 'Toothbrush', completed :false},
    {nameTask: 'Shaving foam', completed :false},
    {nameTask: 'Razor', completed :false},
    {nameTask: 'Lighter and rolling paper', completed :false},

  ],
  [
    {nameCollcition: 'general', completed :false},
    {nameTask: 'Tissue', completed :false},
    {nameTask: 'Wipes', completed :false},
    {nameTask: 'Sewing Tools', completed :false},
    {nameTask: 'screwdriver', completed :false},
    {nameTask: 'Medication + Ben Gay', completed :false},
    {nameTask: 'Garbage bags', completed :false},
    {nameTask: 'Sunscreen', completed :false},
    {nameTask: 'Sunscreen', completed :false},
    {nameTask: 'Lubello', completed :false},

  ],
  [
    {nameCollcition: 'FlightEquipment'},
    {nameTask: 'Backpack', completed :false},
    {nameTask: 'Pillow', completed :false},
    {nameTask: 'Mobile Charger', completed :false},
    {nameTask: 'Phone charger', completed :false},
    {nameTask: 'Tissue', completed :false},
    {nameTask: 'headphones', completed :false},
    {nameTask: 'Umbrella', completed :false},
    {nameTask: 'Power adapter', completed :false},
    {nameTask: 'Power adapter', completed :false},
    {nameTask: 'Passport', completed :false},
    {nameTask: 'Flight ticket', completed :false},
    {nameTask: 'Hotel reservation', completed :false},
    {nameTask: 'Ski pass reservation', completed :false},
    {nameTask: 'Car reservation', completed :false},
    {nameTask: 'Ski/Board equipment reservation', completed :false},
    {nameTask: 'money', completed :false},
    {nameTask: 'Wallet + credit Card + drivers license', completed :false},
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
      .set({vacationID: vacationID.id}, {merge: true}).then(() =>{
        todos.forEach(todo => {
          todo.forEach((task , index)  => {
            if (task.nameTask) {
              task.taskID = index
              admin.firestore().doc(`users/${uid}/vacations/${vacationID.id}/${todo[0].nameCollcition}/${index}`)
                .set(task)
            }
          })
        })
      });
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
exports.updateTasks = functions.region("europe-west1").https.onCall(async (tasksData, context) => {
  const vacationID = tasksData.params.id
  const taskName = tasksData.taskName
  const uid = context.auth.uid;
  tasksData.taskCompleted.forEach(task =>{
    if(task.completed) {
      admin.firestore().doc(`users/${uid}/vacations/${vacationID}/${taskName}/${task.taskID}`).update({
        completed: true
      })
    }
  })
})

