const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    currentUserId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Basket", schema);
