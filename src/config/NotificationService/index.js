//  import firebase from "react-native-firebase";
// import {Platform} from "react-native";
// import {store} from '../../store/'

// const channel = new firebase.notifications.Android.Channel('mh1', 'mh1', firebase.notifications.Android.Importance.Max)
//     .setDescription('mh1 Channel');
// firebase.notifications().android.createChannel(channel);
// export default class Service {
//     static listener;

//     static notificationListener = () => {
//         Service.listener = firebase.notifications().onNotification((notification) => {
//             console.log('notification', notification)
//             if(Platform.OS == "android"){
//                 notification.android.setChannelId("mh1")
//                 notification.android.setSmallIcon("ic_launcher")
//             }
//             firebase.notifications().displayNotification(notification)

//         })
//     }
//     static getToken = () => {
//         return new Promise ((res,rej)=>{
//             firebase.messaging().hasPermission()
//             .then(enabled => {
//                 if (enabled) {
//                     // user has permissions
//                     firebase.messaging().requestPermission()
//                         .then(() => {
//                             // User has authorised
//                             firebase.messaging().getToken()
//                                 .then(fcmToken => {
//                                     if (fcmToken) {
//                                         // user has a device token
//                                         res(fcmToken)
//                                     } else {
//                                         res("")

//                                         // user doesn't have a device token yet
//                                     }
//                                 });
//                         })
//                         .catch(error => {
//                             res("")
//                             // User has rejected permissions
//                         });
//                 } else {
//                     // res("")
//                     firebase.messaging().requestPermission()
//                         .then(() => {
//                             // User has authorised
//                             firebase.messaging().getToken()
//                                 .then(fcmToken => {
//                                     if (fcmToken) {
//                                         // user has a device token
//                                         res(fcmToken)
//                                     } else {
//                                         res("")

//                                         // user doesn't have a device token yet
//                                     }
//                                 });
//                         })
//                         .catch(error => {
//                             res("")
//                             // User has rejected permissions
//                         });
//                     // user doesn't have permission
//                 }
//             });
//         })
//     }
// }
