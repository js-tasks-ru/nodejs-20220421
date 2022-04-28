const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');

const app = new Koa();

app.use(async (ctx, next) => {
    const start = Date.now();
    
    await next();

    const delta = Date.now() - start;
    console.log(`request ${ctx.method} ${ctx.url} has been processed in ${delta}ms`);
});

app.use(serve(path.join(__dirname, 'public')));
app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = 'internal error';
    }
});

const router = new Router();

// router.get('/client.js', (ctx, next) => {
//     const content = fs.readFileSync('public/client.js');
//     ctx.body = content;
// });

router.get('/', async (ctx, next) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    ctx.body = 'hello world';
});

// /upload/image.png, /upload/file.txt, /upload
router.post('/upload/:filename?', async (ctx, next) => {
    // ctx.params.filename
    ctx.body = ctx.request.body.message;
});

app.use(router.routes());

app.listen(3000);
