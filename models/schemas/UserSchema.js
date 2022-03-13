const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false,
    default: null
  },
  // TODO: Preguntar como cambiar la directiva de la ACL para que no me compare con role
  roles: [{
    type: String,
    required: true,
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
},
);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  return user;
}

UserSchema.methods.generateAuthToken = async function () {
  try {
    console.log('generateAuthToken');
    // Generate an auth token for the user
    const user = this;
    console.log(user.name);
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return user;
  } catch (error) {
    return error;
  }
}

UserSchema.statics.findByCredentials = (email, password) => {
  try {
    return UserModel.findOne({ email: email }).then(user => {
      if (!user) {
        //TODO: mirar para traducir
        throw new Error({ error: 'Invalid login credentials' })
      }
      return bcrypt.compare(password, user.password).then(isPasswordMatch => {
        if (!isPasswordMatch) {
          //TODO: mirar para traducir
          throw new Error({ error: 'Invalid login credentials' })
        }
        return Promise.resolve(user);
      }).catch(error => {
        return Promise.reject(error);
      })
    }).catch(error => {
      return Promise.reject(error);
    })
  } catch (error) {
    return error;
  }
}

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserSchema;