import { useBackend } from "@/context/Api"
import { useEffect } from "react";

export default function UrunList() {

    const { urunler, getUrunler } = useBackend();

    useEffect(() => {
        getUrunler();
    }, [])

    return (

        <div className="bg-gray-900 h-screen flex flex-col justify-center items-center">
            <table className="w-3/5 bg-gray-900 text-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-900 ">
                        <th className="py-2 px-4 border-b">Ürün Adı</th>
                        <th className="py-2 px-4 border-b">Fiyat</th>
                        <th className="py-2 px-4 border-b">Stok Miktarı</th>
                    </tr>
                </thead>
                <tbody>
                    {urunler.map((urun, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : ''}>
                            <td className="py-2 px-4 border-b">{urun.UrunAdi}</td>
                            <td className="py-2 px-4 border-b">{urun.Fiyat}</td>
                            <td className="py-2 px-4 border-b">{urun.StokMiktari}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}