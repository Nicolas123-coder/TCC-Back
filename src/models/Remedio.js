import { model, Schema } from "mongoose";

const remedioSchema = new Schema(
  {
    name: String,
    expireDate: Date,
    status: String,
    lab: String,
    stock: String,
    prescription: Boolean,
    patient: String
  },
  {
    timestamps: true,
  }
);

export const RemedioModel = model("Remedio", remedioSchema);