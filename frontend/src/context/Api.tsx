import { createContext, ReactNode, useContext, useState } from "react";
import { Request, Request2, Request3 } from "../backend/api";
import router from "next/router";

interface BackendContextState {
    




}

export const BackendContext = createContext<BackendContextState>({} as BackendContextState);

export const useBackend = () => useContext(BackendContext);

export const BackendProvider = ({ children }: { children: ReactNode }) => {
    


    return (
        <BackendContext.Provider value={{
            


        }}>
            {children}
        </BackendContext.Provider>
    );
};