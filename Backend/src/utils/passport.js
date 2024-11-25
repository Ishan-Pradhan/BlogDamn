// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { User } from "../models/User.models.js";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/api/v1/google/callback", // Redirect URI after Google login
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if user already exists in the database
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//           // If user doesn't exist, create a new one
//           user = new User({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             avatar: profile.photos[0].value,
//           });
//           await user.save();
//         }

//         done(null, user); // Pass the user to the next middleware
//       } catch (error) {
//         done(error, null);
//       }
//     }
//   )
// );

// // Serialize user
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// export default passport;
