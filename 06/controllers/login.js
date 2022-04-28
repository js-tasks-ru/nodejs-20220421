// const uuid = require('uuid/v4');
const passport = require('../libs/passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const config = require('../config');
const { Session } = require('inspector');
const jwt = require('jsonwebtoken');

module.exports.login = async function login(ctx, next) {
  
  await passport.authenticate('local', async (err, user, info) => {
    
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info }; // 'стратегия еще не подключена'
      return;
    }
    // success
    
    const token = jwt.sign({
      user: user.id,
      isAdmin: false,
    }, config.jwt);

    ctx.body = token;

  })(ctx, next);

};