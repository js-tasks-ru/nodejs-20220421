/**
 * 
 * const replacer = new ReplaceStream();
 * 
 * replacer.write('banana');
 * replacer.write('apple'); -> 'cherry'
 * replacer.write('grape');
 * 
 * replacer.on('data', console.log);
 * 
 */

const stream = require('stream');

class ReplaceStream extends stream.Transform {
    constructor(options) {
        super(options);

        this.from = options.from;
        this.to = options.to;
    }

    _transform(chunk, encoding, callback) {
        const str = chunk.toString('utf-8');
        callback(null, str.replaceAll(this.from, this.to));
    }
}

module.exports = function createReplaceStream(options) {
    return new ReplaceStream(options);
}