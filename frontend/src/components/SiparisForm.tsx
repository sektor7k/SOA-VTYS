
import { Request, Request3 } from "@/backend/api";
import { useBackend } from "@/context/Api";
import { useEffect, useState } from "react";

export default function SiparisForm() {

    const { urunler, getUrunler } = useBackend();

    useEffect(() => {
        getUrunler();
    }, [])

    
    const [urun, setUrun] = useState({
        UrunID: null,
        UrunAdi: '',
        Fiyat: '',
        StokMiktari: null
    })

    const handleUrunChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUrunID = parseInt(event.target.value, 10);
        const selectedUrun = urunler.find((u) => u.UrunID === selectedUrunID);
        if (selectedUrun) {
            setUrun(selectedUrun)
        }

        // Burada seçilen ürünü kullanabilirsiniz
        console.log('Seçilen Ürün:', selectedUrun);
    };
    function sleep(n: number | undefined) { return new Promise(resolve => setTimeout(resolve, n)); }

    const formSiparisOlustur = async (event: any) => {
        event.preventDefault();
        const formdata = new FormData(event.target);
        const siparisData = {
            urunID: urun.UrunID,
            urunAdedi: formdata.get('urunAdedi') as string,
        };

        const response = await Request("siparisOlustur",siparisData);

        console.log(response)
        await sleep(1000)
        window.location.reload();
        

    };



    return (
        <div className="bg-gray-900 h-screen">


            <form className="max-w-sm mx-auto pt-52" onSubmit={formSiparisOlustur}>
                <label htmlFor="urunAdi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bir ürün şeçin
                </label>
                <select
                    id="urunAdi"
                    name="urunAdi"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue=""
                    onChange={handleUrunChange}
                >
                    <option value="" >
                        Ürün Seç
                    </option>
                    {urunler.map((urun) => (
                        <option key={urun.UrunID} value={urun.UrunID}>
                            {urun.UrunAdi}
                        </option>
                    ))}
                </select>

                <div className="mb-5 mt-4">
                    <label htmlFor="urunAdedi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ürün Adedi</label>
                    <input type="number" id="urunAdedi" name="urunAdedi" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sipariş Ver</button>
            </form>

        </div>
    )
}