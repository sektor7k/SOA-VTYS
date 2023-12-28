
import mailjet from 'node-mailjet';

const { apiConnect } = mailjet;

const mailjetClient = apiConnect(
  'c6143111e98d1a2c14c0f77331ba3fe2',
  '602cd6dfb7ca30db59346c901e7b8dd5'
);

export async function sendEmailTedarikci2(toEmail, tedarikciAdi, urunAdi, urunFiyati, stokMiktari){
    const request = mailjetClient
  .post('send', { version: 'v3.1' })
  .request({
    Messages: [
      {
        From: {
          Email: "omeraydin2112@gmail.com",
          Name: "Famas Project"
        },
        To: [
          {
            Email: `${toEmail}`,
            Name: "passenger 1"
          }
        ],
        Subject: `Ürün Eklendi - ${urunAdi}`,
        HTMLPart: `
        Merhaba ${tedarikciAdi},
        
        Ürününüz başarıyla eklenmiştir. İşte ürün detayları:
        
        Ürün Adı: ${urunAdi}
        Ürün Fiyatı: ${urunFiyati}
        Stok Miktarı: ${stokMiktari}
        
        Teşekkür ederiz.
        
        Saygılarımla,
        Famas Project`

      }
    ]
  });

request
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });

}

export async function sendEmailMusteri2(toEmail, musteriAdi, urunAdi, urunFiyati, urunAdedi, toplamTutar){


    const request = mailjetClient
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: "omeraydin2112@gmail.com",
            Name: "Famas Project"
          },
          To: [
            {
              Email: `${toEmail}`,
              Name: "passenger 1"
            }
          ],
          Subject: `Sipariş Onayı - ${urunAdi}`,
          HTMLPart: `<h2>Merhaba ${musteriAdi},</h2>
  
          <p>Siparişiniz başarıyla alınmıştır. İşte sipariş detayları:</p>
        
          <ul>
            <li>Ürün Adı: ${urunAdi}</li>
            <li>Fiyatı: ${urunFiyati}</li>
            <li>Adedi: ${urunAdedi}</li>
            <li>Toplam Tutar: ${toplamTutar}</li>
          </ul>
        
          <p>Teşekkür ederiz.</p>
        
          <p>Saygılarımla,<br>
          Famas Project</p>`
  
        }
      ]
    });
  
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });

}