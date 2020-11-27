importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

firebase.initializeApp({ 
    apiKey: "AIzaSyB7KjwFdnci_sOKbxce7nWBvpWg793Y0Ts",
    projectId: "mi-tiendita-virtual",
    messagingSenderId: "804963636791",
    appId: "1:804963636791:web:7e736a349666fa019451b2",
 });
const messaging = firebase.messaging();