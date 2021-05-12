import mongoose from "mongoose";

/*
? Nota: Create schema for user.
* Attribute: (required: true), mongoose check validation.

* Attribute: (unique: true), mongoose create an (unique index),
* ... in collection for make sure avoid duplicates (users).

TODO: Learn second param for, mongoose schema: 
? Schema Options = timestamps
* timestamps: automatically assign, (createdAt and updatedAt) in mongodb.
*/

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

/*
? Nota: Create model for user.
* Define: mongoose.model(modelName, modelSchema)
*/

const User = mongoose.model("User", userSchema);

export default User;
