const http = require('http');

const testApiUpdate = () => {
    const data = JSON.stringify({
        phone: '999888777'
    });

    // We need a user ID. From previous step we saw User ID 2 exists.
    const userId = 2;

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: `/api/users/${userId}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        console.log(`StatusCode: ${res.statusCode}`);

        let responseBody = '';

        res.on('data', (chunk) => {
            responseBody += chunk;
        });

        res.on('end', () => {
            console.log('Response Body:', responseBody);
            try {
                const json = JSON.parse(responseBody);
                // Note: The response might not include phone if we didn't add it to the response JSON in the controller.
                // Let's check the controller code again.
                // It returns: _id, firstName, lastName, email, role, status.
                // It DOES NOT return phone in the JSON response!
                // But we can verify if it updated by fetching it again or trusting the 200 OK.
                // Actually, let's fetch it again via API to be sure.
                fetchUser(userId);
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Error:', error);
    });

    req.write(data);
    req.end();
};

const fetchUser = (id) => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: `/api/users/${id}`,
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => responseBody += chunk);
        res.on('end', () => {
            console.log('Fetched User:', responseBody);
            const json = JSON.parse(responseBody);
            if (json.phone === '999888777') {
                console.log('SUCCESS: API updated phone correctly.');
            } else {
                console.log('FAILURE: API did not update phone.');
            }
        });
    });
    req.end();
};

testApiUpdate();
