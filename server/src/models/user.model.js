const {model,Schema} = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    enum: ["customer", "restaurant"],
    default: "customer",
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model("user", UserSchema);

module.exports.getUsers = () => UserModel.find();

module.exports.getUserByEmail = (email) => UserModel.findOne({ email });

module.exports.getUserById = (id) => UserModel.findById(id);

module.exports.createUser = ({name, email, password, type}) =>
  UserModel.create({name, email, password, type});

module.exports.deleteUserById = (id) => UserModel.findOneAndDelete({ id });
module.exports.updateUserById = (id, values) =>
  UserModel.findByIdAndUpdate(id, values);
