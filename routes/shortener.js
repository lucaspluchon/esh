const express = require("express")
const router = express.Router()
const controller = require("../controllers/shortener")

router.get('/:hash', (req, res) => {
    const hash = req.params.hash;
    controller.getLink(res, hash);
})

router.post('/', (req, res) => {
    const link = req.body.link
    controller.addLink(res, link);
})

module.exports = router;