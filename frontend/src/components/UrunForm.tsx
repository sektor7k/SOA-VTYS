import {Request} from "@/backend/api"

export default function UrunForm() { 

    function sleep(n: number | undefined) { return new Promise(resolve => setTimeout(resolve, n)); }

    const formUrunEkle = async (event: any) => {
        event.preventDefault();
        const formdata = new FormData(event.target);
        const urunData = {
          urunAdi: formdata.get('urunAdi') as string, 
          urunFiyati: formdata.get('urunFiyati') as string,
          stokMiktari: formdata.get('stokMiktari') as string,
        }; 

        const response = await Request("urunekle",urunData);

        console.log(response)
        await sleep(1000)
        window.location.reload();
    
        
      };

    return (
        <div className="bg-gray-900 h-screen">

            <form className="max-w-sm mx-auto pt-52" action="" onSubmit={formUrunEkle}>
                <div className="mb-5">
                    <label htmlFor="urunAdi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ürün Adı</label>
                    <input type="text" id="urunAdi" name="urunAdi" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="urunFiyati" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ürün Fiyatı</label>
                    <input type="number" id="urunFiyati" name="urunFiyati" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="stokMiktari" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stok Miktarı</label>
                    <input type="number" id="stokMiktari" name="stokMiktari" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ürün Ekle</button>
            </form>

        </div>
    )
}