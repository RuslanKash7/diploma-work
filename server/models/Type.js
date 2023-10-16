const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true, allowNull: false },
    // product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    brand_id: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
    // может двухсторонняя связь Типов с Брэндами неправильная(((
  },
  {
    timestamps: true,
  }
);

module.exports = model("Type", schema);
