const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: { type: String, allowNull: false },
    description: { type: String, allowNull: false },
    product_id: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("ProductInfo", schema);
