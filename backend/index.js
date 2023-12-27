// index.mjs

import sendEmail from './sendEmail.js';

const toEmail = 'omeraydin2112@gmail.com';
const subject = 'Test E-postası';
const text = 'Bu bir test e-postasıdır.';

sendEmail(toEmail, subject, text);
