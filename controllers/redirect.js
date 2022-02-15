const db = require("../storage/database");

exports.redirect = (res, hash) => {
    db.getLink_database(hash).then((data) => {
        if (!data.exists())
            res.redirect('/')
        else
            res.redirect(data.val());
    })
}