import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';

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

export default async function main() {
    const client = new hello_proto.Greeter('localhost:50051', credentials.createInsecure());

    return new Promise((resolve, reject) => {
        client.getCustomers({}, (err, response) => {
            if (err) {
                reject(err);
                return;
            }

            const customers = response.customers;
            // Diğer işlemler...

            resolve(customers);
        });
    });
}

// Kullanım
// main()
//     .then(customers => {
//         console.log('Customer List:', customers);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });