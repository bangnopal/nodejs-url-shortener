const router = require('express').Router()
const fs = require('fs')
const validUrl = require('valid-url')

const connect = require('../auth/connect')
const { random_string } = require('../../lib/math')
const config = JSON.parse(fs.readFileSync('./src/auth/config.json'))
const { base_url } = config



router.all('/', async (req, res) => {
    res.status(200).json({
        "code": 200,
        "status": "success",
        "response": {
            "message": "welcome"
        }
    })
})

router.post('/short', (req, res) => {
    if (req.body.url) {
        if (!validUrl.isUri(req.body.url)) {
            return res.status(400).json({
                "code": 400,
                "status": "error",
                "response": {
                    "message": "invalid url"
                }
            })
        }
        var random = random_string(9)
        let data = {
            long_url: req.body.url,
            short_url: base_url + random,
            shortcode: random,
            hit: 0
        }
        let query = connect.query("INSERT INTO url_shortener SET ?", data, (err, result) => {
            if (err) {
                return res.status(503).json({
                    "code": 503,
                    "status": "service unavailable",
                    "response": {
                        "message": "an error occured when proccessing your request"
                    }
                })
            }
            res.status(200).json({
                "code": 200,
                "status": "success",
                "result": {
                    "long_url": req.body.url,
                    "short_url": base_url + random
                }
            })
        })
    } else {
        return res.status(400).json({
            "code": 400,
            "status": "error",
            "response": {
                "message": "missing url parameter"
            }
        })
    }
})



module.exports = router
