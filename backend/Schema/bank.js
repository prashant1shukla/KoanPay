const mongoose = require("mongoose");

const BankNameScehma = new mongoose.Schema(
  {
    bank:{ type: String, unique: true },
    parameters: Array,
  },
  {
    collection: "BankName",
  }
);

mongoose.model("BankName", BankNameScehma);