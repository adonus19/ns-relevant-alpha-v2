import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
admin.initializeApp();

/**
* Here we're using Gmail to send
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().sendmail.emailid,
        pass: functions.config().sendmail.password
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        // const dest = req.query.dest;

        const mailOptions = {
            from: 'Relevant App <relevant.app.mule@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: 'daniel.j.pogue@gmail.com',
            subject: 'Prayer Request', // email subject
            text: req.body.data
        };

        // returning result
        return transporter.sendMail(mailOptions, (err: any, info: any) => {
            if (err) {
                console.log(`An error occurred: `, err)
                return res.send(err.toString());
            }
            console.log('All is well! Here is what happened: ', info);
            return res.send({ data: info });
        });
    });
});

exports.addAdmin = functions.https.onCall((email: string, context) => {
    console.log('data received => ', email);
    return admin.auth().getUserByEmail(email)
        .then((user: any) => {
            return admin.auth().setCustomUserClaims(user.uid, { admin: true });
        })
        .then(() => {
            return { message: `${email} is now an admin!` };
        })
        .catch((err: any) => {
            console.log('error happend in addAdmin', err);
            return err;
        });
});
