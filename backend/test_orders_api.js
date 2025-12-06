const http = require('http');

const testOrdersApi = () => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/orders',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`StatusCode: ${res.statusCode}`);
        let responseBody = '';
        res.on('data', (chunk) => responseBody += chunk);
        res.on('end', () => {
            console.log('Response Body:', responseBody);
            try {
                const json = JSON.parse(responseBody);
                if (Array.isArray(json)) {
                    console.log(`SUCCESS: Fetched ${json.length} orders.`);
                    if (json.length > 0) {
                        console.log('Sample Order:', JSON.stringify(json[0], null, 2));
                    }
                } else {
                    console.log('FAILURE: Response is not an array.');
                }
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Error:', error);
    });

    req.end();
};

testOrdersApi();
