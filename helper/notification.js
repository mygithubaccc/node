// const { initializeApp } = require('firebase-admin/app');
// const admin = require('firebase-admin')

// require('dotenv').config()
//  const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// exports.sendNotification = async (notificationTitle, Subtitle) =>{
//     const notification ={
//         title: notificationTitle,
//         text: Subtitle
//     };

//     const fcm_tokens = [];

//     const notification_body ={
//         'notification': notification,
//         'registration_ids': fcm_tokens
//     }

//     fetch(`https://fcm.googleapis.com/fcm/send`,{
//         'method': 'POST',
//         'headers':{
//             'Authorization': 'key='+ process.env.FIREBASE_SERVERKEY,
//             'Content-Type': 'application/json'
//         },
//         'body':JSON.stringify(notification_body)
//     })
// };

// var FCM = require('fcm-node');
// var serverKey = process.env.FIREBASE_SERVERKEY;
// var fcm = new FCM(serverKey);

// var message = {
// to:'<DEVICE_TOKEN>',
//     notification: {
//         title: 'NotifcatioTestAPP',
//         body: '{"Message from node js app"}',
//     },

//     data: { //you can send only notification or only data(or include both)
//         title: 'ok cdfsdsdfsd',
//         body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
//     }

// };

// fcm.send(message, function(err, response) {
//     if (err) {
//         console.log("Something has gone wrong!"+err);
//         console.log("Respponse:! "+response);
//     } else {
//         // showToast("Successfully sent with response");
//         console.log("Successfully sent with response: ", response);
//     }

// });