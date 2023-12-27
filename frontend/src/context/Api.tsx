import { createContext, ReactNode, useContext, useState } from "react";
import { Request, Request2, Request3 } from "../backend/api";
import router from "next/router";


interface BackendContextState {
    getUrunler: () => Promise<void>;
    urunler: {
        UrunID: null;
        UrunAdi: string;
        Fiyat: string;
        StokMiktari: null;
    }[];
    getSiparisler: () => Promise<void>;
    siparisler: {
        SiparisID: null;
        MusteriID: null;
        SiparisTarihi: string;
        ToplamTutar: string;
        UrunID: null;
        Miktar: null;
        musteriAdi: string;
        urunAdi: string;
    }[];
    getStokGiris: () => Promise<void>;
    getStokCikis: () => Promise<void>;
    stokGirisler: {
        GirisID: null;
        UrunID: null;
        TedarikciID: null;
        GirisMiktari: null;
        GirisTarihi: string;
        tedarikciAdi: string;
        urunAdi: string;
    }[];
    stokCikislari: {
        CikisID: null;
        UrunID: null;
        SiparisID: null;
        CikisMiktari: null;
        CikisTarihi: string;
        urunAdi: string;
        musteriAdi: string;
    }[];
    getTedarikciler: () => Promise<void>;
    tedarikciler: {
        TedarikciID: string;
        TedarikciAdi: string;
        IletisimBilgisi: string;
    }[];

}

export const BackendContext = createContext<BackendContextState>({} as BackendContextState);

export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }: { children: ReactNode }) => {

    const [urunler, setUrunler] = useState([{
        UrunID: null,
        UrunAdi: '',
        Fiyat: '',
        StokMiktari: null
    }]);

    const [siparisler, setSiparisler] = useState([{
        SiparisID: null,
        MusteriID: null,
        SiparisTarihi: '',
        ToplamTutar: '',
        UrunID: null,
        Miktar: null,
        musteriAdi: '',
        urunAdi: ''
    }]);

    const [stokGirisler, setStokGirisler] = useState([{
        GirisID: null,
        UrunID: null,
        TedarikciID: null,
        GirisMiktari: null,
        GirisTarihi: '',
        tedarikciAdi: '',
        urunAdi: ''
    }
    ])

    const [stokCikislari, setStokCikislari] = useState([{
        CikisID: null,
        UrunID: null,
        SiparisID: null,
        CikisMiktari: null,
        CikisTarihi: '',
        urunAdi: '',
        musteriAdi: ''
    }
    ])

    const [tedarikciler, setTedarikciler] = useState([{
        TedarikciID: '2',
        TedarikciAdi: 'XYZ Elektronik',
        IletisimBilgisi: 'tedarikci2@gmail.com'
      }
    ]);

    const getUrunler = async () => {
        const response = await Request3('urun')
        setUrunler(response)

    }

    const getSiparisler = async () => {
        const response = await Request3('siparisler')
        setSiparisler(response)
        



    }
    const getStokGiris = async () => {
        const response = await Request3('stokgiris')
        setStokGirisler(response)


    }
    const getStokCikis = async () => {
        const response = await Request3('stokcikis')
        console.log(response)
        setStokCikislari(response)


    }

    const getTedarikciler = async () => {
       
        const response = await Request3('tedarikci');
        setTedarikciler(response.tedarikciler)
        console.log(response.tedarikciler)

    }



    return (
        <BackendContext.Provider value={{
            urunler,
            getUrunler,
            getSiparisler,
            siparisler,
            getStokGiris,
            getStokCikis,
            stokGirisler,
            stokCikislari,
            getTedarikciler,
            tedarikciler

        }}>
            {children}
        </BackendContext.Provider>
    );
};