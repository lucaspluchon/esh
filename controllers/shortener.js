const db = require("../storage/database");
const hash = require("../hash_system");

let url_pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)?/gi;
let regex_url = new RegExp(url_pattern);

function is_notWeblink(link)
{
    return !link || !link.match(regex_url);
}

exports.getLink = (res, hash) =>
{
    let result = {};

    if (hash == null)
    {
        result.error = "Given hash is null"
        res.status(400).send();
        return;
    }

    db.getLink_database(hash).then((data) => {
        if (data.exists())
        {
            result.link = data.val();
        }
        else
        {
            result.error = "Hash doesn't exist"
            res = res.status(404)
        }

        res.send(result);
    })
}

exports.addLink = (res, link) =>
{
    const result = {};

    if (link == null)
    {
        result.error = "Given link is null"
        res.status(400).send();
        return;
    }

    if (is_notWeblink(link)) {
        result.error = "Invalid link";
        res.status(400).send(result);
        return;
    }

    const hash_link = hash.generate(link);
    result.hash = hash_link;
    db.addLink_database(hash_link, link).then(() => res.send(result));

}