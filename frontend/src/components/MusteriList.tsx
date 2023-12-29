import { useBackend } from "@/context/Api"
import { useEffect } from "react";

export default function MusteriList(){

    const {musteriler,getMusteri} = useBackend();


    useEffect(()=>{
        getMusteri()

    },[])

    return(
        <div className="bg-gray-900 h-screen flex flex-col justify-center items-center">
        <table className="w-3/5 bg-gray-900 text-white border border-gray-300">
            <thead>
                <tr className="bg-gray-900 ">
                    <th className="py-2 px-4 border-b">Müşteri ID</th>
                    <th className="py-2 px-4 border-b">Müşteri Adı</th>
                    <th className="py-2 px-4 border-b">İletişim Bilgisi</th>


                </tr>
            </thead>
            <tbody>
                {musteriler.map((musteri, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : ''}>
                        <td className="py-2 px-4 border-b">{musteri.MusteriID}</td>
                        <td className="py-2 px-4 border-b">{musteri.MusteriAdi}</td>
                        <td className="py-2 px-4 border-b">{musteri.IletisimBilgisi}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}