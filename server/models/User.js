const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "USER" },
    basket: { type: Schema.Types.ObjectId, ref: "Basket" },
    // rating: { type: Schema.Types.ObjectId, ref: "Rating" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
