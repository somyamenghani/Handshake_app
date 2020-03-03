"use strict"
  const app = require("./app");
  //routes
  const login = require("./routes/login");
  const signup = require("./routes/signup");
  const profile = require("./routes/profile");
  const update = require("./routes/update");
  const companyProfile = require("./routes/companyProfile");
  const events = require("./routes/events");
  
  
  app.use("/login", login);
  app.use("/signup", signup);
  app.use("/profile", profile);
  app.use("/update", update);
  app.use("/companyProfile", companyProfile);
  app.use("/events", events);
  
  app.listen(3001, () => {
    console.log(`Server listening on port 3001`);
  });
  
  module.exports = app;