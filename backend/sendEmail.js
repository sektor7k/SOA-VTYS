// sendEmail.mjs

import mailgun from 'mailgun-js';

const apiKey = '7e1634cf0fe373bf27517f4a987e7e12-1900dca6-8a170a70';
const domain = 'sandbox303ed995ed024dbca94d68ae502a5aa6.mailgun.org';

const mg = mailgun({ apiKey, domain });

const sendEmail = async (to, subject, text) => {
  const data = {
    from: 'famasproject@gmail.com', // Gönderen e-posta adresini değiştirin
    to,
    subject,
    text,
  };

  try {
    await mg.messages().send(data);
    console.log('E-posta başarıyla gönderildi.');
  } catch (error) {
    console.error('E-posta gönderirken bir hata oluştu:', error);
    throw error;
  }
};

export default sendEmail;




//