var path = require( 'path' );
var rootPath = path.normalize( __dirname + '/../../' );

var development = {
    rootPath: rootPath,
    db: 'mongodb://localhost/weddingapp',
    port: process.env.PORT || 3030,
    API_URL: 'https://localhost/',
    R_URL: 'http://localhost:4200',
    EMAIL_SECRET: 'something',
    SMTP_PASS: 'universe',
    JWT_SECRET: 'shhh..',
    env: global.process.env.NODE_ENV || 'development'
};

var production = {
    rootPath: rootPath,
    db: 'mongodb://localhost/weddingapp',
    port: process.env.PORT || 443,
    API_URL: 'https://89.28.158.70/',
    R_URL: 'http://localhost:4200',
    EMAIL_SECRET: 'something',
    SMTP_PASS: 'universe',
    JWT_SECRET: 'shhh..',
    env: global.process.env.NODE_ENV || 'production'
};

exports.Config = global.process.env.NODE_ENV === 'development' ? development : production;
