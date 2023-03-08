const express = require('express');

class NextjsExpressRouter {
    constructor(express, next) {
        this.express = express
        this.next = next
    }

    async init() {
        this.initApi()
        this.initPages()
        this.initErrors()
    }

    initApi() {
        const authRoutes = require("./routes/authRoutes");
        this.express.use("/api/auth", authRoutes);
    }

    initPages() {
        this.express.get('/', (req, res) => {
            return this.next.render(req, res, `/index`, req.query)
        })

        this.express.get('*', (req, res) => {
            return this.next.render(req, res, `${req.path}`, req.query)
        })
    }

    initErrors() {
        // catch 404 and forward to error handler
        this.express.use((req, res, next) => {
            const err = new Error('Not Found')
            err.status = 404
            next(err)
        })

        this.express.use((err, req, res, next) => {
            res.status(err.status || 500)
            res.locals.error = err
            res.locals.errorDescription = err.message
            this.next.render(req, res, "/_error", {  })
        })
    }
}

module.exports = NextjsExpressRouter
