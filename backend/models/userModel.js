import mongoose from "mongoose";

/* ==> ( User Schema ) <== ATTRIBUTES.
*  timestamps: true, automatically assign Created At and Updated At.
?  required: true, mongoose check field validation.
*  unique: true, create a Unique Index to make sure avoid duplicates Users.
*/
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: { type: String, default: "" },
      logo: { type: String, default: "" },
      description: { type: String, default: "" },
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
  },
  {
    timestamps: true,
  }
);

/* ==> ( User Model ) <==
? Field: model('Model Name', schemaName)
*/
const User = mongoose.model("User", userSchema);

export default User;
