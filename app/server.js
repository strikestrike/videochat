require("dotenv").config();

const express = require("express");
const cors = require("cors");
const next = require('next')
const NextjsExpressRouter = require("./nextjs_express_router")

const httpServer = (express) => {
    return require('http').createServer(express)
}

const httpsServer = (express) => {
    const fs = require('fs');
    const path = require("path");
    const options = {
        key: fs.readFileSync(path.join(__basedir, "app/cert/CA/localhost/localhost.decrypted.key")),
        cert: fs.readFileSync(path.join(__basedir, "app/cert/CA/localhost/localhost.crt"))
    }
    return require('https').createServer(options, express)
}

class Server {
    constructor(port) {
        this.port = port
        this.express = express()
        this.next = next({ dev: process.env.NODE_ENV !== 'production' })
        this.router = new NextjsExpressRouter(this.express, this.next)
    }

    async start() {
        await this.next.prepare()

        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cors("*"));
        this.express.use(express.static(__dirname + '/public'));
        this.express.use('/uploads', express.static('uploads'));

        await this.router.init()
        this.server = httpsServer(this.express)

        // socket connection
        const { createSocketServer } = require("./socket/socketServer");
        createSocketServer(this.server);

        this.server.listen(this.port)
    }
}

module.exports = Server

