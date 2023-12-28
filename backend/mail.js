// index.mjs

import sendEmail from './sendEmail.js';

export async function sendEmailTedarikci(toEmail, tedarikciAdi, urunAdi, urunFiyati, stokMiktari) {

    const subject = `Ürün Eklendi - ${urunAdi}`;
    const text = `
    Merhaba ${tedarikciAdi},
    
    Ürününüz başarıyla eklenmiştir. İşte ürün detayları:
    
    Ürün Adı: ${urunAdi}
    Ürün Fiyatı: ${urunFiyati}
    Stok Miktarı: ${stokMiktari}
    
    Teşekkür ederiz.
    
    Saygılarımla,
    Famas Project`;

    try {
        sendEmail(toEmail, subject, text);
    }
    catch (err) {
        return { success: false, message: 'sendEmailTedarikci failed' }
    }
}





