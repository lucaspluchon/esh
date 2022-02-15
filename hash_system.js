const sha1 = require('sha1');

exports.generate = (link) =>
{
    return sha1(link).slice(0,5);
}