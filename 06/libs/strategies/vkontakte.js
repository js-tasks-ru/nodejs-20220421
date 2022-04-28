const { Strategy } = require('passport-vkontakte');
const config = require('../../config');

module.exports = new Strategy(
  {
    clientID: config.providers.vkontakte.app_id,
    clientSecret: config.providers.vkontakte.app_secret,
    callbackURL: 'http://localhost:3000/oauth/vkontakte',
    profileFields: ['email'],
    apiVersion: '5.130'
  },
  (accessToken, refreshToken, params, profile, done) => {
    console.log(accessToken, refreshToken, params, profile);
    
    done(null, null, 'Стратегия вконтакте еще не настроена');
  }
);
