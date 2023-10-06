import { model, Schema } from "mongoose";

const remedioSchema = new Schema(
  {
    nfcId: String,
    name: String,
    expireDate: Date,
    status: String,
    lab: String,
    stock: String,
    prescription: Boolean,
    patients: Array,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

export const RemedioModel = model("Remedio", remedioSchema);