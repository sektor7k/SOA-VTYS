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

export async function sendEmailMusteri(toEmail, musteriAdi, urunAdi, urunFiyati, urunAdedi, toplamTutar) {


    const subject = `Sipariş Onayı - ${musteriAdi}`;
    const text = `
    Merhaba ${musteriAdi},

    Siparişiniz başarıyla alınmıştır. İşte sipariş detayları:

    Ürün Adı: ${urunAdi}
    Fiyatı: ${urunFiyati}
    Adedi: ${urunAdedi}
    Toplam Tutar: ${toplamTutar}

    Teşekkür ederiz.

    Saygılarımla,
    Famas Project
    `;

    try {
        sendEmail(toEmail, subject, text);
    }
    catch (err) {
        return { success: false, message: 'sendEmailMusteri failed' }
    }
}




