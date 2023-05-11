const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoUrl =
  "mongodb+srv://prashant1shukla:PassWord@koanpay.9rjwa0c.mongodb.net/?retryWrites=true&w=majority";
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "pfhbvhsbdfvjsbdfvhjbshdfvjshbhbhbhdn";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./Schema/userDetails");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, usertype } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      usertype,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  try {
    // const oldUser = await User.findOne({ email });
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not Found" });
    }
    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET);

      if (res.status(201)) {
        return res.json({ status: "ok", data: token, userDetails: user });
      } else {
        return res.json({ error: "error" });
      }
    }
    // res.json({status: "error", error:"Invalid Password"});
  } catch (error) {
    res.json({ status: "error", error: "Invalid Password" });
  }
});

app.get("/userData", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

// Creating Bank
require("./Schema/bank");
const Bank = mongoose.model("BankName");
app.post("/create-bank", async (req, res) => {
  const { bank, admin } = req.body;
  try {
    const oldBank = await Bank.findOne({ bank });
    if (oldBank) {
      return res.json({ error: "bank Exists" });
    }
    // Bank Creation
    await Bank.create({
      bank: bank,
      admin: admin.email,
    });
    // Admin creation
    await User.create({
      fname: admin.fname,
      lname: admin.lname,
      email: admin.email,
      userType: "admin",
      BankName: bank,
      password: `${bank}_${admin.email}`,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// Adding User to Bank
app.post("/adduser", async (req, res) => {
  const bank = req.body.bank;
  const user = req.body.user;
  console.log("The bank is: ", bank);
  // Adding user in BankDB
  const bankindb = await Bank.findOne({ bank: bank });
  // console.log("The bank in DB is, ",bankindb);
  let prevuser = bankindb.users;
  prevuser.push(user.email);
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        users: prevuser,
      },
    }
  );
  // Adding user in UserDB
  await User.create({
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    userType: "user",
    BankName: bank,
    password: `${bank}_${user.email}`,
  });
  res.send({
    status: "ok",
  });
});

// Getting Bank Details
app.get("/getBankdetails", async (req, res) => {
  const bank = req.headers.authorization;
  const bankindb = await Bank.findOne({ bank: bank });
  res.send({
    status: "ok",
    details: bankindb,
  });
});

// Adding Parameter
app.post("/updatestructure", async (req, res) => {
  const { bank, parameter } = req.body;
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        parameters: parameter,
      },
    }
  );
  res.send({
    status: "Updated",
  });
});

// Getting all Bank Details
app.get("/getAllBanks", async (req, res) => {
  const data = await Bank.find();
  res.send({
    status: "ok",
    banks: data,
  });
});

// Updating the Variable in a specific Parameter
app.post("/updateVariable", async (req, res) => {
  const { bank, parameter, variable, user } = req.body;
  const bankindb = await Bank.find({ bank: bank });
  var prevparams = bankindb[0].parameters;
  var prevlogs = bankindb[0].logs;
  var par_index, var_index;
  //   Updating the variable
  prevparams.map((param, index1) => {
    if (param.par_name === parameter) {
      par_index = index1;
      param.variables.map((variableindb, index2) => {
        if (variableindb.var_name === variable.var_name) {
          var_index = index2;
        }
      });
    }
  });
  //   Updating the logs
  var newlog = {
    user: user,
    parameter: parameter,
    prevvar: prevparams[par_index].variables[var_index],
    newvar:variable
  };
  prevlogs.push(newlog);
  prevparams[par_index].variables[var_index] = variable;
  await Bank.updateOne(
    {
      bank: bank,
    },
    {
      $set: {
        parameters: prevparams,
        logs:prevlogs
      },
    }
  );
  res.send({
    status: "updated",
  });
});

app.listen(5000, () => {
  console.log("Server started!");
});
