const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const passport = require('./libs/passport');
const {login} = require('./controllers/login');
const jwt = require('jsonwebtoken');

const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

app.use(async (ctx, next) => {
  const header = ctx.get('Authorization');
  if (!header) return next();

  const payload = jwt.verify(header, config.jwt);

  /**
   * 1. parse header
   * 2. fetch user data using the key
   * 3. store user data in ctx
   */

  

  return next();
});

const router = new Router({prefix: '/api'});

router.post('/login', login);

router.get('/oauth/:provider', async (ctx, next) => {
  await passport.authenticate(ctx.params.provider, { scope: 'email' })(ctx, next);
  
  ctx.status = 200;
  ctx.body = {
    location: ctx.response.get('Location'),
  };
});

router.post('/oauth_callback', async (ctx, next) => {
  await passport.authenticate(ctx.request.body.provider, async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = info;
      return;
    }

    // success
  })(ctx, next);
});

app.use(router.routes());

// this for HTML5 history in browser
const fs = require('fs');
const User = require('./models/User');

const index = fs.readFileSync(path.join(__dirname, 'public/index.html'));
app.use(async (ctx) => {
  if (ctx.url.startsWith('/api') || ctx.method !== 'GET') return;
  
  ctx.set('content-type', 'text/html');
  ctx.body = index;
});

module.exports = app;
