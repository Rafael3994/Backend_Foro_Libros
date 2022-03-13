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
  // console.log('generateAuthToken');
  // // Generate an auth token for the user
  // const user = this;
  // console.log(user.name);
  // const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET)
  // user.tokens = user.tokens.concat({ token: token })
  // await user.save()
  // return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await UserModel.findOne({ email: email })
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserSchema;