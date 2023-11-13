import { model, Schema } from "mongoose";

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
            enum: ['customer', 'restaurant'],
            default: 'customer',
      },
      authentication: {
            password: {
                  type: String,
                  required: true,
                  select: false,
            },
            salt: {
                  type: String,
                  required: false,
            },
            sessionToken: {
                  type: String,
                  select: false,
            },
      }

})

export const UserModel = model("user", UserSchema);



export const getUsers = () => UserModel.find();

export const getUserByEmail = (email) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const getUserById = (id) => UserModel.findById(id);

export const createUser = (name, email, password) => UserModel.create(name, email, password);
  
export const deleteUserById = (id) => UserModel.findOneAndDelete({ id });
export const updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);