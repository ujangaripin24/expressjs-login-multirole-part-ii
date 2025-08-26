import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "../models/index.js";

const { TblUser } = db;

const BASE_URL = process.env.BASE_URL;

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:52333/api/v1/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("Google profile:", profile);
    try {
      const email = profile.emails?.[0]?.value;
      const displayName = profile.displayName || "Google User";
      const photo = profile.photos?.[0]?.value || process.env.DEFAULT_AVATAR;

      if (!email) {
        return done(new Error("Email tidak tersedia dari Google"), null);
      }

      let user = await TblUser.findOne({ where: { email } });

      if (!user) {
        user = await TblUser.create({
          name: displayName,
          email,
          password: null,
          type: "google",
          role: "user",
          link_picture: photo
        });
      } else {
        if (user.type !== "google") {
          await user.update({ type: "google" });
        }
        if (!user.link_picture && photo) {
          await user.update({ link_picture: photo });
        }
      }

      return done(null, user);
    } catch (err) {
      console.error("Error in Google Strategy:", err);
      return done(err, null);
    }
  }
));

export default passport;
