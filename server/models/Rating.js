const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    product_id: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    user_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rate: { type: String, required: true, allowNull: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Rating", schema);
