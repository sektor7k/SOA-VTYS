import soap from 'soap';

const url = 'http://localhost:3030/my-service?wsdl';

const callSoapService = async () => {
    try {
        const client = await soap.createClientAsync(url);

        return new Promise((resolve, reject) => {
            // GetTedarikciler fonksiyonunu çağırırken callback fonksiyonu ekleyin
            client.MyService.MyPort.GetTedarikciler({}, function(err, response) {
                if (err) {
                    console.error('SOAP Service Error:', err);
                    reject(err);
                } else {
                    // response içinde istediğiniz veri bulunabilir, bu kısmı projenize göre uyarlayabilirsiniz.
                    const result = response && response.tedarikciler ? response.tedarikciler : null;
                    if (result) {
                        resolve(result);
                    } else {
                        console.error('SOAP Service Error: Response format is invalid');
                        reject(new Error('Response format is invalid'));
                    }
                }
            });
        });
    } catch (error) {
        console.error('SOAP Service Error:', error);
        throw error;
    }
};

export default callSoapService;
