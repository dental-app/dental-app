const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const Appointment = require("./models/appointment");
const User = require("./models/user");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

//Connect to MongoDB
const db =
  "mongodb+srv://ta7an:3asba@ta7an.vzvo0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log(error));

//@route GET /appointments
//@desc  Get all appointments
//@access Private
app.get("/user/:id", (req, res) => {
  // const userId = req.params.id;
  User.findById(req.params.id)
    .populate("appointment")
    .then((user) => {
      res.send(user);
    })
    .catch((error) => console.log(error));
});

app.get("/appointments", (req, res) => {
  Appointment.find()
    .sort({ date: 1 })
    .then((appointments) => res.json(appointments))
    .catch((err) =>
      res
        .status(500)
        .json({ msg: "Could not get the appointments. Please try again." })
    );
});
app.get("/users", (req, res) => {
  User.find()
    .sort({ date: 1 })
    .then((user) => res.json(user))
    .catch((err) =>
      res
        .status(500)
        .json({ msg: "Could not get the appointments. Please try again." })
    );
});

//@route POST /
//@desc  Add new appointment
//@access Public
app.put("/user/:id", (req, res) => {
  const {
    fullname,
    cin,
    town,
    adress,
    postalCode,
    cellphone,
    date,
    time,
    maturity,
    sex,
    civility,
    data,
    description,
  } = req.body;
  User.findOneAndUpdate(req.params.id, {
    fullname,
    cin,
    town,
    adress,
    postalCode,
    cellphone,
    date,
    time,
    maturity,
    sex,
    civility,
    data,
    description,
  })
    .then((user) => res.json({ msg: "User edited succesfully" }))
    .catch((err) =>
      res.status(500).json({ msg: "Something went wrong. Please try again." })
    )

    .catch((err) => res.status(404).json({ msg: "User not found" }));
});

//@route Delete /appointment/:id
//@desc  Delete an appointment
//@access Private
app.delete("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      user.remove().then(() => res.json({ msg: "User removed succesfully." }))
    )
    .catch((err) => res.status(404).json({ msg: "User not found" }));
});
app.post("/add-user", (req, res) => {
  const {
    fullname,
    cin,
    town,
    adress,
    postalCode,
    cellphone,
    date,
    time,
    maturity,
    sex,
    civility,
    description,
    data,
  } = req.body;
  console.log(req.body);
  const validateDateTime = async (date, time) => {
    const existingAppointment = await Appointment.findOne({ date, time });
    if (existingAppointment) {
      res.status(400).json({
        msg: "Please choose another date or time. This one is not available.",
      });
    } else {
      saveUser();
    }
  };

  validateDateTime(date, time);
  const saveUser = () => {
    const newUser = new User({
      fullname,
      cin,
      town,
      adress,
      postalCode,
      cellphone,
      date,
      time,
      maturity,
      sex,
      civility,
      data,
      description,
    });
    // add to database
    newUser
      .save()
      .then((user) => res.json({ msg: "User added succesfully" }))
      .catch((err) =>
        res.status(500).json({ msg: "Something went wrong. Please try again." })
      );
  };
});
app.post("/add-appointment", (req, res) => {
  const ids = req.params.id;
  const { fullname, cellphone, price, date, time, description } = req.body;
  if (!fullname || !cellphone || !date || !time || !description) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const validateDateTime = async (date, time) => {
    const existingAppointment = await Appointment.findOne({ time });
    if (existingAppointment) {
      res.status(400).json({
        msg: "Please choose another time. This one is not available.",
      });
    } else {
      saveAppointment();
    }
  };

  validateDateTime(date, time);
  const saveAppointment = () => {
    //Construct appointment
    const newAppointment = new Appointment({
      fullname,
      cellphone,
      date,
      price,
      time,
      description,
    });
    // add to database
    newAppointment
      .save()
      .then(async (appointment) => {
        try {
          const userById = await User.findById(id);
          if (!userById) res.json({ msg: "Appointment added succesfully" });
          if (userById.appointments) {
            userById.appointments.push(appointment);
            await userById.save();
          }
          const newUser = await User.updateOne({ appointments: [appointment] });
          await newUser.save();
        } catch (error) {
          console.log(error);
        }
      })
      .then((appointment) => res.json({ msg: "Appointment added succesfully" }))
      .catch((err) =>
        res.status(500).json({ msg: "Something went wrong. Please try again." })
      );
  };
});

//@route PUT /appointment/:id
//@desc  Edit an appointment
//@access Private
app.put("/appointment/:id", (req, res) => {
  Appointment.findById(req.params.id)
    .then((appointment) => {
      //New values
      const { date, time, rest } = req.body;
      (appointment.date = date),
        (appointment.time = time),
        (appointment.rest = rest),
        appointment
          .save()
          .then((appointment) =>
            res.json({ msg: "Appointment edited succesfully" })
          )
          .catch((err) =>
            res
              .status(500)
              .json({ msg: "Something went wrong. Please try again." })
          );
    })
    .catch((err) => res.status(404).json({ msg: "Appointment not found" }));
});

//@route Delete /appointment/:id
//@desc  Delete an appointment
//@access Private
app.delete("/appointment/:id", (req, res) => {
  Appointment.findById(req.params.id)
    .then((appointment) =>
      appointment
        .remove()
        .then(() => res.json({ msg: "Appointment removed succesfully." }))
    )
    .catch((err) => res.status(404).json({ msg: "Appointment not found" }));
});

//@route POST /login
//@desc  Admin login
//@access Public
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  User.findOne({ username }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    if (user.password !== password)
      return res.status(400).json({ msg: "Invalid credentials" });

    jwt.sign(
      { id: user._id },
      process.env.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) return res.status(400).json({ msg: "Something went wrong" });
        res.json({
          token,
          user: {
            id: user._id,
            username: user.username,
          },
        });
      }
    );
  });
});

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
