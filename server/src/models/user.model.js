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

export const UserModel = model("User", UserSchema);