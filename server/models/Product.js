const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true, allowNull: false },
    price: { type: Number, allowNull: false},
    img: { type: String },
    rating_id: [{ type: Schema.Types.ObjectId, ref: "Rating", default: 0 }],
    type: [{ type: Schema.Types.ObjectId, ref: "Type" }],
    brand: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
    totalAmount: { type: Number, default: 0},
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
