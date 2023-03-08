module.exports = {
    client:
        process.env.NODE_ENV === 'production'
            ? 'https://10.10.13.242:5000'
            : 'http://10.10.13.242:3000',
    server: 'https://10.10.13.242:5000',
};
