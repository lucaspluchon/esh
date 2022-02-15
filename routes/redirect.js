const express = require("express")
const controller = require("../controllers/redirect");
const path = require("path");

const router = express.Router()
const public_file = path.join(__dirname, '..', 'public/');

router.get('/', (req, res) => {
    const hash = req.baseUrl.substring(1);
    controller.redirect(res, hash);
})

module.exports = router;