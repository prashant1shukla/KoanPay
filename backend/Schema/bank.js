const mongoose = require("mongoose");

const BankNameScehma = new mongoose.Schema(
  {
    bank:{ type: String, unique: true },
    admin:String,
    parameters: Array,
    logs:Array,
    users:Array, 
    terminals: Array,
  },
  {
    collection: "BankName",
  }
);

mongoose.model("BankName", BankNameScehma);