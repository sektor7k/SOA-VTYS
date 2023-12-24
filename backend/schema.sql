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
    UrunID INT,
    Miktar INT,
    FOREIGN KEY (MusteriID) REFERENCES Musteri(MusteriID),
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
(IN MusteriID INT, IN SiparisTarihi DATE, IN ToplamTutar DECIMAL(10, 2), IN UrunID INT, IN Miktar INT)
BEGIN
    INSERT INTO Siparis (MusteriID, SiparisTarihi, ToplamTutar, UrunID, Miktar)
    VALUES (MusteriID, SiparisTarihi, ToplamTutar, UrunID, Miktar);
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

-- Kullanıcı Tanımlı Fonksiyonlar
DELIMITER //

CREATE FUNCTION ToplamSiparisTutariHesapla (SiparisID INT)
RETURNS DECIMAL(10, 2)
READS SQL DATA
BEGIN
    DECLARE ToplamTutar DECIMAL(10, 2);
    SELECT SUM(Fiyat * Miktar) INTO ToplamTutar
    FROM Siparis
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
INSERT INTO Urun (UrunAdi, Fiyat, StokMiktari) VALUES
('Laptop', 1500.00, 50),
('Akıllı Telefon', 800.00, 30),
('Tablet', 500.00, 20);

-- Tedarikçiler Tablosu
INSERT INTO Tedarikci (TedarikciAdi, IletisimBilgisi) VALUES
('ABC Bilgisayar', 'tedarikci@gmail.com'),
('XYZ Elektronik', 'tedarikci2@gmail.com');

-- Müşteriler Tablosu
INSERT INTO Musteri (MusteriAdi, IletisimBilgisi) VALUES
('Ahmet Demir', 'musteri@gmail.com'),
('Ayşe Yılmaz', 'musteri2@gmail.com');

-- Siparişler Tablosu
INSERT INTO Siparis (MusteriID, SiparisTarihi, ToplamTutar, UrunID, Miktar) VALUES
(1, '2023-01-01', 2500.00, 1, 2),
(2, '2023-02-01', 1000.00, 2, 3);

-- Stok Girişleri Tablosu
INSERT INTO StokGiris (UrunID, TedarikciID, GirisMiktari, GirisTarihi) VALUES
(1, 1, 10, '2023-01-01'),
(2, 2, 5, '2023-02-01');

-- Stok Çıkışları Tablosu
INSERT INTO StokCikis (UrunID, SiparisID, CikisMiktari, CikisTarihi) VALUES
(1, 1, 1, '2023-01-02'),
(2, 2, 2, '2023-02-02');
