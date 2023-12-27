import { useBackend } from "@/context/Api"
import { useEffect } from "react";

export default function TedarikciList() {

    const { getTedarikciler, tedarikciler } = useBackend();


    useEffect(() => {

        getTedarikciler();

    }, [])

    return (

        <div className="bg-gray-900 h-screen flex flex-col justify-center items-center space-y-20">
            <table className="w-3/5 bg-gray-900 text-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-900 ">
                        <th className="py-2 px-4 border-b">Tedarikci ID</th>
                        <th className="py-2 px-4 border-b">Tedarikçi Adı</th>
                        <th className="py-2 px-4 border-b">İletişim Bilgisi</th>
                    </tr>
                </thead>
                <tbody>
                    {tedarikciler.map((tedarikci, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : ''}>
                            <td className="py-2 px-4 border-b">{tedarikci.TedarikciID}</td>
                            <td className="py-2 px-4 border-b">{tedarikci.TedarikciAdi}</td>
                            <td className="py-2 px-4 border-b">{tedarikci.IletisimBilgisi}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}