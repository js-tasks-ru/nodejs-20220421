/**
 * 1. launch server
 * 2. make request
 * 3. check response
 * 4. terminate server
 */

const server = require('../server');
const got = require('got');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('server tests', () => {
    before((done) => {
        server.listen(3000, done);
    });

    after((done) => {
        server.close(done);
    });

    // beforeEach(() => {});

    it('get /', async () => {
        const { body, statusCode } = await got('http://localhost:3000');
        assert.strictEqual(body, 'hello world');
        assert.strictEqual(statusCode, 200);
    });

    it('get /not-found', async () => {
        const { body, statusCode } = await got('http://localhost:3000/not-found', {
            throwHttpErrors: false,
        });
        assert.strictEqual(body, 'not found');
        assert.strictEqual(statusCode, 404);
    });

    it('post /calculate', async () => {
        const { body, statusCode } = await got.post('http://localhost:3000/calculate', {
            json: {
                a: 1000, b: 4323,
            }
        });

        assert.strictEqual(statusCode, 200);
        assert.ok(typeof body === 'string');
        assert.ok(body.length);

        const filepath = path.join(__dirname, '..', body);

        assert.ok(fs.existsSync(filepath));

        const content = fs.readFileSync(filepath, { encoding: 'utf-8' });
        assert.strictEqual(Number(content), 5323);
    });
});