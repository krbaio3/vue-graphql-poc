const { Schema, model } = require('mongoose');
const md5 = require('md5');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Post'
  }
});

UserSchema.pre(
  'save',
  function(next) {
    this.avatar = `http://gravatar.com/avatar/${md5(
      this.username
    )}?d=identicon`;
    next();
  },
  error => console.error(error)
);

UserSchema.pre(
  'save',
  function(next) {
    if (!this.isModified('password')) {
      next();
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (error, hash) => {
        if (error) return next(error);
        this.password = hash;
        next();
      });
    });
  },
  error => console.error(error)
);

module.exports = model('User', UserSchema);
