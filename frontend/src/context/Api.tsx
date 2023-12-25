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
    }[]
    

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

    const getUrunler = async () => {
        const response = await Request3('urun')
        setUrunler(response)

    }

    const getSiparisler = async () => {
        console.log("sad")
        const response = await Request3('siparisler')
        setSiparisler(response)
        
       

    }

    return (
        <BackendContext.Provider value={{
            urunler,
            getUrunler,
            getSiparisler,
            siparisler
            

        }}>
            {children}
        </BackendContext.Provider>
    );
};