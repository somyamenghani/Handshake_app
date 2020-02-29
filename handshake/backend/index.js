"use strict"
  const app = require("./app");
  //routes
  const login = require("./routes/login");
  const signup = require("./routes/signup");
  const profile = require("./routes/profile");
  const update = require("./routes/update");
  
  
  app.use("/login", login);
  app.use("/signup", signup);
  app.use("/profile", profile);
  app.use("/update", update);
  
  app.listen(3001, () => {
    console.log(`Server listening on port 3001`);
  });
  
  module.exports = app;