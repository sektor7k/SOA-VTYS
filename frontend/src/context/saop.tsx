// ../context/saop.ts

import { createClientAsync } from 'soap';

export interface SoapResponse {
  tedarikciler: any;
  // Diğer özellikleri buraya ekleyebilirsiniz
}

export const callSoapService = async (): Promise<SoapResponse> => {
  try {
    const client = await createClientAsync(url);

    return new Promise<SoapResponse>((resolve, reject) => {
      client.MyService.MyPort.GetTedarikciler({}, function (err: any, response: SoapResponse) {
        if (err) {
          console.error('SOAP Service Error:', err);
          reject(err);
        } else {
          const result = response && response.tedarikciler ? response.tedarikciler : null;
          if (result) {
            console.log('Tedarikçiler:', result);
            resolve(response);
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





const url = 'http://localhost:3030/my-service?wsdl';