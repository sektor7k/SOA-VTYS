import { useBackend } from "@/context/Api"
import { useEffect } from "react";

export default function SiparisList(){

    const {getSiparisler, siparisler} = useBackend();

    useEffect(()=>{
        getSiparisler()

    },[])

    return(
        <div className="bg-gray-900 h-screen flex flex-col justify-center items-center">
        <table className="w-3/5 bg-gray-900 text-white border border-gray-300">
            <thead>
                <tr className="bg-gray-900 ">
                    <th className="py-2 px-4 border-b">Müşteri Adı</th>
                    <th className="py-2 px-4 border-b">Ürün Adı</th>
                    <th className="py-2 px-4 border-b">Ürün Adedi</th>
                    <th className="py-2 px-4 border-b">Sipariş Tutarı</th>
                    <th className="py-2 px-4 border-b">Sipariş Tarihi</th>
                </tr>
            </thead>
            <tbody>
                {siparisler.map((siparis, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : ''}>
                        <td className="py-2 px-4 border-b">{siparis.musteriAdi}</td>
                        <td className="py-2 px-4 border-b">{siparis.urunAdi}</td>
                        <td className="py-2 px-4 border-b">{siparis.Miktar}</td>
                        <td className="py-2 px-4 border-b">{siparis.ToplamTutar}</td>
                        <td className="py-2 px-4 border-b">{siparis.SiparisTarihi}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}