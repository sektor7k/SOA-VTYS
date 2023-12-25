import { useBackend } from "@/context/Api"
import { useEffect } from "react";

export default function StokList(){

    const {getStokGiris, getStokCikis, stokGirisler} = useBackend();


    useEffect(()=>{

        getStokGiris()
        getStokCikis()

    },[])

    return(

        <div className="bg-gray-900 h-screen flex flex-col justify-center items-center">
        <table className="w-3/5 bg-gray-900 text-white border border-gray-300">
            <thead>
                <tr className="bg-gray-900 ">
                    <th className="py-2 px-4 border-b">Ürün Adı</th>
                    <th className="py-2 px-4 border-b">Tedarikçi Adı</th>
                    <th className="py-2 px-4 border-b">Ürün Giriş Adedi</th>
                    <th className="py-2 px-4 border-b">Giriş tarihi</th>
                </tr>
            </thead>
            <tbody>
                {stokGirisler.map((stok, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : ''}>
                        <td className="py-2 px-4 border-b">{stok.urunAdi}</td>
                        <td className="py-2 px-4 border-b">{stok.tedarikciAdi}</td>
                        <td className="py-2 px-4 border-b">{stok.GirisMiktari}</td>
                        <td className="py-2 px-4 border-b">{stok.GirisTarihi}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}