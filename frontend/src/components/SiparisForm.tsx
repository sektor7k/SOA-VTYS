export default function SiparisForm() {

    return (
        <div className="bg-gray-900 h-screen">


            <form className="max-w-sm mx-auto pt-52">
                <div className="mb-5">
                    <label htmlFor="urunAdi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ürün Adı</label>
                    <input type="text" id="urunAdi" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="stokMiktari" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ürün Miktarı</label>
                    <input type="number" id="stokMiktari" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sipariş Ver</button>
            </form>

        </div>
    )
}