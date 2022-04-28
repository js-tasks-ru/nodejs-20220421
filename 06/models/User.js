const mongoose = require('mongoose');
const crypto = require('crypto');
const connection = require('../libs/connection');
const config = require('../config');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: 'E-mail пользователя не должен быть пустым.',
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Некорректный email.',
      },
    ],
    unique: 'Такой email уже существует',
  },
  displayName: {
    type: String,
    required: 'У пользователя должно быть имя',
    unique: 'Такое имя уже существует',
    // index: true,
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
  address: {
    city: {
      type: String,
      // index: true,
    },
    street: String,
    postal: String,
  },
}, {
  timestamps: true,
});

schema.index({ 'address.city': 1, 'address.street': 1 });

// User.find({ 'address.city': 'Moscow' });
// User.find({ 'address.city': 'Moscow', 'address.street': 'Lenina' });

// User.find({ displayName: "user1", salt: "" })
// schema.index({displayName: 1, salt: 1});

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
        password, salt,
        config.crypto.iterations,
        config.crypto.length,
        config.crypto.digest, // sha512, sha256
        (err, key) => {
          if (err) return reject(err);
          resolve(key.toString('hex'));
        }
    );
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.crypto.length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

schema.methods.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
};

schema.methods.checkPassword = async function(password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
};

module.exports = connection.model('User', schema);
