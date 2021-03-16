const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')

const connect = require('./src/auth/connect')
const config = JSON.parse(fs.readFileSync('./src/auth/config.json'))
const routes = require('./src/main/routes')
const { base_url } = config

// this is make json output looks pretty
app.set('json spaces', 5)

app.use(express.urlencoded({
    extended: false
}))
// enable logging
app.use(morgan('combined'))
app.use('/api', routes)


app.get('/api/short', (req, res) => {
    res.sendFile('./static/index.html', {root: __dirname})
})

app.all('/', (req, res) => {
    res.status(200).json({
        "code": 200,
        "status": "success",
        "response": {
            "message": "hello world!"
        }
    })
})

app.all('/:shortcode', (req, res) => {
    let query = connect.query(`SELECT * FROM url_shortener WHERE shortcode='${req.params.shortcode}'`, (err, results) => {
        if (err) {
            return res.status(404).json({
                "code": 404,
                "status": "error",
                "error": {
                    "message": "not found"
                }
            })
        }
        
        try {
            let update = connect.query(`UPDATE url_shortener SET hit=hit+1 WHERE shortcode='${req.params.shortcode}'`)
            res.redirect(results[0].long_url)
        } catch (e) {
            res.status(404).json({
                "code": 404,
                "status": "error",
                "message": "not found"
            })
        }
    })
})

// handle page not found
app.use(function (req, res,next) {
    res.status(405).json({
        "code": 405,
        "status": "error",
        "response": {
            "message": "method not allowed"
        }
    })
})


app.listen(config.port, () => {
    console.log("Program running at port " + config.port)
})
