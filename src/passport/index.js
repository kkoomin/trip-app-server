// const local = require("./localStrategy");
// const kakao = require("./kakaoStrategy");
// const { Customer } = require("../../models");

// module.exports = (passport) => {
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     Customer.findOne({ where: { id } })
//       .then((user) => done(null, user))
//       .catch((err) => done(err));
//   });

//   local(passport);
//   kakao(passport);
// };
