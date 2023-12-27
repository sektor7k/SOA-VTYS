import soap from 'soap';
import { parseString } from 'xml2js';

const url = 'http://localhost:3030/my-service?wsdl';

const callSoapService = async () => {
    try {
        const client = await soap.createClientAsync(url);

        // GetTedarikciler fonksiyonunu çağırırken callback fonksiyonu ekleyin
        client.MyService.MyPort.GetTedarikciler({}, function(err, response) {
            if (err) {
                console.error('SOAP Service Error:', err);
            } else {
                // response içinde istediğiniz veri bulunabilir, bu kısmı projenize göre uyarlayabilirsiniz.
                const result = response && response.tedarikciler ? response.tedarikciler : null;
                if (result) {
                    console.log('Tedarikçiler:', result);
                } else {
                    console.error('SOAP Service Error: Response format is invalid');
                }
            }
        });

        // Diğer işlemler...
    } catch (error) {
        console.error('SOAP Service Error:', error);
    }
};

callSoapService();
