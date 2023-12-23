-- Veri Tabanı oluştur
CREATE DATABASE famas;
USE famas;

-- Ürünler Tablosu
CREATE TABLE Urun (
    UrunID INT PRIMARY KEY,
    UrunAdi VARCHAR(100) NOT NULL,
    Fiyat DECIMAL(10, 2) DEFAULT 0.0,
    StokMiktari INT CHECK (StokMiktari >= 0)
);

-- Tedarikçiler Tablosu
CREATE TABLE Tedarikci (
    TedarikciID INT PRIMARY KEY,
    TedarikciAdi VARCHAR(100) NOT NULL,
    IletisimBilgisi VARCHAR(100)
);

-- Müşteriler Tablosu
CREATE TABLE Musteri (
    MusteriID INT PRIMARY KEY,
    MusteriAdi VARCHAR(100) NOT NULL,
    IletisimBilgisi VARCHAR(100)
);

-- Siparişler Tablosu
CREATE TABLE Siparis (
    SiparisID INT PRIMARY KEY,
    MusteriID INT,
    SiparisTarihi DATE,
    ToplamTutar DECIMAL(10, 2) CHECK (ToplamTutar >= 0),
    FOREIGN KEY (MusteriID) REFERENCES Musteri(MusteriID)
);

-- Sipariş Detayları Tablosu
CREATE TABLE SiparisDetay (
    SiparisDetayID INT PRIMARY KEY,
    SiparisID INT,
    UrunID INT,
    Miktar INT CHECK (Miktar >= 0),
    FOREIGN KEY (SiparisID) REFERENCES Siparis(SiparisID),
    FOREIGN KEY (UrunID) REFERENCES Urun(UrunID)
);

-- Stok Girişleri Tablosu
CREATE TABLE StokGiris (
    GirisID INT PRIMARY KEY,
    UrunID INT,
    TedarikciID INT,
    GirisMiktari INT CHECK (GirisMiktari >= 0),
    GirisTarihi DATE,
    FOREIGN KEY (UrunID) REFERENCES Urun(UrunID),
    FOREIGN KEY (TedarikciID) REFERENCES Tedarikci(TedarikciID)
);

-- Stok Çıkışları Tablosu
CREATE TABLE StokCikis (
    CikisID INT PRIMARY KEY,
    UrunID INT,
    SiparisID INT,
    CikisMiktari INT CHECK (CikisMiktari >= 0),
    CikisTarihi DATE,
    FOREIGN KEY (UrunID) REFERENCES Urun(UrunID),
    FOREIGN KEY (SiparisID) REFERENCES Siparis(SiparisID)
);