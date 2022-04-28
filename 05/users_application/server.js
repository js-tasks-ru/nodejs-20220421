const Koa = require('koa');
const Router = require('koa-router');
const User = require('./models/User');
const mongoose = require('mongoose');

const app = new Koa();

app.use(require('koa-bodyparser')());

const router = new Router();

router.get('/users', async (ctx, next) => {
    const users = await User.find();
    ctx.body = users;
});

router.get('/users/:id', async (ctx, next) => {
    const user = await User.findOne({ _id: ctx.params.id });
    if (!user) {
        ctx.status = 404;
        ctx.body = 'no user';
    } else {
        ctx.body = user;
    }
});

async function handleValidationErrors(ctx, next) {
    try {
        await next();
    } catch (error) {
        if (error.name !== 'ValidationError') throw error;
        
        ctx.status = 400;
        
        ctx.body = Object.keys(error.errors).reduce((acc, field) => {
            return {
                ...acc,
                [field]: error.errors[field].message,
            };
        }, {});
    }
}

router.put('/users/:id', handleValidationErrors, async (ctx, next) => {
    const user = await User.findByIdAndUpdate(
        ctx.params.id,
        {
            email: ctx.request.body.email,
            name: ctx.request.body.name,
        },
        {
            omitUndefined: true,
            new: true,
            runValidators: true,
        }
    );

    // const user = await User.findOne({ _id: ctx.params.id });
    // user.email = ctx.request.body.email;
    // await user.save();

    ctx.body = user;
});

router.post('/users', handleValidationErrors, async (ctx, next) => {
    const user = await User.create({
        email: ctx.request.body.email,
        name: ctx.request.body.name,
    });

    ctx.body = user;
});

app.use(router.routes());

module.exports = app;
