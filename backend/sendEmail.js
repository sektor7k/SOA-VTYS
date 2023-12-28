// sendEmail.mjs

import mailgun from 'mailgun-js';

const apiKey = 'e368d7746b1eea4f3a2ce87e804319b9-1900dca6-28b335cc';
const domain = 'sandboxeaf8a301705f4cef80ece3ece5d525ce.mailgun.org';

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