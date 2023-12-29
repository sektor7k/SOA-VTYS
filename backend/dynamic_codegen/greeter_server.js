import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import {getMusteri2} from '../database.js'

// __filename ve __dirname'e erişim için gerekli modül ve fonksiyonları ekleyin
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// proto yüklemesi için gerekli kod
const packageDefinition = loadSync(path.resolve(__dirname, '../proto/musteri.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const hello_proto = loadPackageDefinition(packageDefinition).helloworld;


function sayHello(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name });
}

async function getCustomers(call, callback) {
  const customers2 = [
    { MusteriID: 1, MusteriAdi: 'Customer a', IletisimBilgisi: 'Contact 1' },
    { MusteriID: 2, MusteriAdi: 'Customer 2', IletisimBilgisi: 'Contact 2' },
    // ... other customers
  ];

  const customer = await getMusteri2()
  const customers = customer;

  callback(null, { customers });
}



function main() {
  const server = new Server();
  server.addService(hello_proto.Greeter.service, { sayHello, getCustomers });
  server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running on port 50051');
  });
}

main();

