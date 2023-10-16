const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    // id: { type: String, primaryKey: true, autoIncrement: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    basket_id: [{ type: Schema.Types.ObjectId, ref: "Basket" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("BasketProduct", schema);
