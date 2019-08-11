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
        console.log('Making sure this is mapped right', req.body.data);

        // getting dest email by query string
        // const dest = req.query.dest;

        const mailOptions = {
            from: 'Relevant App <relevant.app.mule@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: 'daniel.j.pogue@gmail.com',
            subject: 'Prayer Request', // email subject
            text: req.body.data
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro: any, info: any) => {
            if (erro) {
                return res.send(erro.toString());
            }
            console.log(info);
            return res.send('email sent!');
        });
    });
});
