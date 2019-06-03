const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.updateUser = functions.firestore
  .document('tweet/{user}')
  .onUpdate(async (change, context) => {
      console.log('onUpdate');
      if(!change.after.exists)
          return;
      const newValue = change.after.data();
      const token = newValue.token;
      const like = newValue.like;
      const message = newValue.message;
      console.log(newValue);
      if(like > 0 && token) {
          const payload = {
              notification: {
                  title: 'あなたのTweetが「いいね」されました',
                  body: message,
              }
          };
          console.log('Send FCM:' + token );
          const response = await admin.messaging().sendToDevice(token, payload);
          console.log('Send FCM Done:' + response.successCount);
          return;
      }
      return;
  });