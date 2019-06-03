importScripts('/__/firebase/6.1.0/firebase-app.js');
importScripts('/__/firebase/6.1.0/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '<送信者ID>'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});