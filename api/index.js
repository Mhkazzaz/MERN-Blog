const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const salt = bcrypt.genSaltSync(10);
const secret = "absdffsd3253129jfdsbdg";
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const port = 4000;
mongoose.connect("mongodb+srv://root:root@mern-blog.6ascjix.mongodb.net/");
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          username,
          password
        });
      });
    } else {
      res.status(400).json({ message: "Wrong Credentials" });
    }
  } else {
    res.status(400).json({ message: "Wrong Credentials" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      console.error("Unauthorized");
    } else {
      res.json(info);
    }
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json("Ok");
});

app.post("/post", uploadMiddleware.single("file"), (req, res) => {
  res.json(req.files);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
