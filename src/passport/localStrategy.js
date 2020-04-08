const LocalStrategy = require("passport-local").Strategy;
const { Customer } = require("../../models");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const userEmail = await Customer.findOne({ where: { email } });
          if (userEmail) {
            // const result = await bcrypt.compare(password, userEmail.password);
            const result = true;
            if (result) {
              done(null, userEmail);
            } else {
              done(null, false, { message: false });
            }
          } else {
            done(null, false, { message: false });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
