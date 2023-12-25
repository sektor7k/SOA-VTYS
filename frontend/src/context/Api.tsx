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


    const getUrunler = async () => {
        const response = await Request3('urun')
        setUrunler(response)

    }

    return (
        <BackendContext.Provider value={{
            urunler,
            getUrunler
            


        }}>
            {children}
        </BackendContext.Provider>
    );
};