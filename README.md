# Stok Takip Uygulaması

Bu proje, basit bir stok takip uygulamasını içermektedir. Uygulama, tedarikçilerin ürün ekleyebilmesi ve müşterilerin sipariş verebilmesi amacıyla geliştirilmiştir.

## Kurulum

1. Öncelikle `schema.sql` dosyasını kullanarak veritabanınızı MySQL'de oluşturun.

2. Ardından, frontend ve backend dizinlerinde sırasıyla `npm install` komutunu çalıştırarak bağımlılıkları yükleyin.

3. Projenizi ayağa kaldırmak için frontend ve backend dizinlerinde sırasıyla `npm run dev` komutunu çalıştırın.

## Kullanım

- **Ürün Ekleme:** Tedarikçiler ürün ekleyebilirler. Eklenen ürünler "Ürünler" tablosunda görüntülenir.
![image](https://github.com/sektor7k/SOA-VTYS/assets/76495441/57b27a45-9ae5-4b6a-83b9-5eda27d26a7f)

- **Ürünler Tablosu** Eklenen ürünler "Ürünler" tablosunda görüntülenir.
  ![image](https://github.com/sektor7k/SOA-VTYS/assets/76495441/66ba51c9-2c2b-4c5c-8c01-38d6beefd968)

- **Sipariş verme:** Müşteriler sipariş verebilirler.
![image](https://github.com/sektor7k/SOA-VTYS/assets/76495441/6add18d4-68d9-4959-89aa-68911f789024)

- **Sipariş Tablosu** Siparişler "Siparişler" tablosunda görüntülenir.
![image](https://github.com/sektor7k/SOA-VTYS/assets/76495441/3abafce6-e26c-4935-8893-18ae1ea889fa)

- **Stok Giriş ve Çıkışları:** Ürün eklenmesi ve sipariş verilmesi durumlarında stok giriş ve çıkışları "Stok Giriş" ve "Stok Çıkış" tablolarında görüntülenir.
![image](https://github.com/sektor7k/SOA-VTYS/assets/76495441/1a304df7-7af1-4b77-b139-609246e52ba4)

## Notlar

- Bu uygulamada kullanıcı yetkilendirmesi veya oturum yönetimi bulunmamaktadır. Sadece tedarikçiler ürün ekleyebilir ve müşteriler sipariş verebilir.


## Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.
