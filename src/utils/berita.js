const request = require('postman-request');

const getBerita = (callback) => {
    const apiKey = '6296b1dda8000d8a9a27df43e03ecdc8'; // Ganti dengan API key Anda
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=id&keywords=cuaca,badai,hujan,bmkg,weather,rain,sunny`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Tidak dapat menghubungi layanan berita!', undefined);
        } else if (body.error) {
            callback('Gagal mengambil berita. Silakan cek API Key atau endpoint.', undefined);
        } else {
            callback(undefined, body.data);
        }
    });
};

module.exports = getBerita;
