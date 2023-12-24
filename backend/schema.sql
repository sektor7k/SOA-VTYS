-- Veri Tabanı oluştur
CREATE DATABASE famas;
USE famas;

-- Ürünler Tablosu
CREATE TABLE Urun (
    UrunID INT PRIMARY KEY AUTO_INCREMENT,
    UrunAdi VARCHAR(100) NOT NULL,
    Fiyat DECIMAL(10, 2) DEFAULT 0.0,
    StokMiktari INT CHECK (StokMiktari >= 0)
);

-- Tedarikçiler Tablosu
CREATE TABLE Tedarikci (
    TedarikciID INT PRIMARY KEY AUTO_INCREMENT,
    TedarikciAdi VARCHAR(100) NOT NULL,
    IletisimBilgisi VARCHAR(100)
);

-- Müşteriler Tablosu
CREATE TABLE Musteri (
    MusteriID INT PRIMARY KEY AUTO_INCREMENT,
    MusteriAdi VARCHAR(100) NOT NULL,
    IletisimBilgisi VARCHAR(100)
);

-- Siparişler Tablosu
CREATE TABLE Siparis (
    SiparisID INT PRIMARY KEY AUTO_INCREMENT,
    MusteriID INT,
    SiparisTarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ToplamTutar DECIMAL(10, 2) CHECK (ToplamTutar >= 0),
    FOREIGN KEY (MusteriID) REFERENCES Musteri(MusteriID)
);

-- Sipariş Detayları Tablosu
CREATE TABLE SiparisDetay (
    SiparisDetayID INT PRIMARY KEY AUTO_INCREMENT,
    SiparisID INT,
    UrunID INT,
    Miktar INT CHECK (Miktar >= 0),
    FOREIGN KEY (SiparisID) REFERENCES Siparis(SiparisID),
    FOREIGN KEY (UrunID) REFERENCES Urun(UrunID)
);

-- Stok Girişleri Tablosu
CREATE TABLE StokGiris (
    GirisID INT PRIMARY KEY AUTO_INCREMENT,
    UrunID INT,
    TedarikciID INT,
    GirisMiktari INT CHECK (GirisMiktari >= 0),
    GirisTarihi DATE,
    FOREIGN KEY (UrunID) REFERENCES Urun(UrunID),
    FOREIGN KEY (TedarikciID) REFERENCES Tedarikci(TedarikciID)
);

-- Stok Çıkışları Tablosu
CREATE TABLE StokCikis (
    CikisID INT PRIMARY KEY AUTO_INCREMENT,
    UrunID INT,
    SiparisID INT,
    CikisMiktari INT CHECK (CikisMiktari >= 0),
    CikisTarihi DATE,
    FOREIGN KEY (UrunID) REFERENCES Urun(UrunID),
    FOREIGN KEY (SiparisID) REFERENCES Siparis(SiparisID)
);

-- Unique Kısıtları
ALTER TABLE Tedarikci
ADD CONSTRAINT UQ_TedarikciAdi UNIQUE (TedarikciAdi);

ALTER TABLE Musteri
ADD CONSTRAINT UQ_MusteriAdi UNIQUE (MusteriAdi);

-- Default Kısıtları
ALTER TABLE Urun
MODIFY COLUMN Fiyat DECIMAL(10, 2) DEFAULT 0.0;

-- Not Null Kısıtları
ALTER TABLE Urun
MODIFY COLUMN UrunAdi VARCHAR(100) NOT NULL;

ALTER TABLE Tedarikci
MODIFY COLUMN TedarikciAdi VARCHAR(100) NOT NULL;

-- Stored Procedure'lar
DELIMITER //

CREATE PROCEDURE SiparisEkle 
(IN MusteriID INT, IN SiparisTarihi DATE, IN ToplamTutar DECIMAL(10, 2))
BEGIN
    INSERT INTO Siparis (MusteriID, SiparisTarihi, ToplamTutar)
    VALUES (MusteriID, SiparisTarihi, ToplamTutar);
END //

CREATE PROCEDURE StokGuncelle 
(IN UrunID INT, IN YeniStokMiktari INT)
BEGIN
    UPDATE Urun
    SET StokMiktari = YeniStokMiktari
    WHERE UrunID = UrunID;
END //

DELIMITER ;

-- View'lar
CREATE VIEW AktifSiparisler AS
SELECT S.SiparisID, M.MusteriAdi, S.SiparisTarihi, S.ToplamTutar
FROM Siparis S
JOIN Musteri M ON S.MusteriID = M.MusteriID
WHERE S.SiparisTarihi >= CURDATE();

CREATE VIEW TedarikciDetaylari AS
SELECT TedarikciID, TedarikciAdi, IletisimBilgisi
FROM Tedarikci;

CREATE VIEW UrunStokDurumu AS
SELECT UrunID, UrunAdi, StokMiktari
FROM Urun;

CREATE VIEW YetersizStoklar AS
SELECT UrunID, UrunAdi, StokMiktari
FROM Urun
WHERE StokMiktari < 10;

CREATE VIEW SiparisDetaylari AS
SELECT SD.SiparisDetayID, SD.SiparisID, U.UrunAdi, SD.Miktar
FROM SiparisDetay SD
JOIN Urun U ON SD.UrunID = U.UrunID;

-- Kullanıcı Tanımlı Fonksiyonlar
DELIMITER //

CREATE FUNCTION ToplamSiparisTutariHesapla (SiparisID INT)
RETURNS DECIMAL(10, 2)
READS SQL DATA
BEGIN
    DECLARE ToplamTutar DECIMAL(10, 2);
    SELECT SUM(Fiyat * Miktar) INTO ToplamTutar
    FROM SiparisDetay
    WHERE SiparisID = SiparisID;
    RETURN ToplamTutar;
END//


CREATE FUNCTION StokMiktariKontrolEt (UrunID INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE StokMiktari INT;
    SELECT StokMiktari INTO StokMiktari
    FROM Urun
    WHERE UrunID = UrunID;
    RETURN StokMiktari;
END//
DELIMITER ;


-- TEST VERİLERİ EKLEME
-- Ürünler Tablosu
INSERT INTO Urun (UrunID, UrunAdi, Fiyat, StokMiktari) VALUES
(1, 'Laptop', 1500.00, 50),
(2, 'Akıllı Telefon', 800.00, 30),
(3, 'Tablet', 500.00, 20);

-- Tedarikçiler Tablosu
INSERT INTO Tedarikci (TedarikciID, TedarikciAdi, IletisimBilgisi) VALUES
(1, 'ABC Bilgisayar', 'tedarikci@gmail.com'),
(2, 'XYZ Elektronik', 'tedarikci2@gmail.com');

-- Müşteriler Tablosu
INSERT INTO Musteri (MusteriID, MusteriAdi, IletisimBilgisi) VALUES
(1, 'Ahmet Demir', 'musteri@gmail.com'),
(2, 'Ayşe Yılmaz', 'musteri2@gmail.com');

-- Siparişler Tablosu
INSERT INTO Siparis (SiparisID, MusteriID, SiparisTarihi, ToplamTutar) VALUES
(1, 1, '2023-01-01', 2500.00),
(2, 2, '2023-02-01', 1000.00);

-- Sipariş Detayları Tablosu
INSERT INTO SiparisDetay (SiparisDetayID, SiparisID, UrunID, Miktar) VALUES
(1, 1, 1, 2),
(2, 1, 2, 3),
(3, 2, 3, 1);

-- Stok Girişleri Tablosu
INSERT INTO StokGiris (GirisID, UrunID, TedarikciID, GirisMiktari, GirisTarihi) VALUES
(1, 1, 1, 10, '2023-01-01'),
(2, 2, 2, 5, '2023-02-01');

-- Stok Çıkışları Tablosu
INSERT INTO StokCikis (CikisID, UrunID, SiparisID, CikisMiktari, CikisTarihi) VALUES
(1, 1, 1, 1, '2023-01-02'),
(2, 2, 2, 2, '2023-02-02');
