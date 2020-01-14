const request = require('request');

module.exports = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let data = JSON.parse(body);
                resolve(data)
            } else {
                reject(error)
            }
        });
    })
}