const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("./models/userModel");
const passport = require("passport");

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']

},
  async function (accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        let needsUpdate = false;
        if (user.facebookId !== profile.id) {
          user.facebookId = profile.id;
          needsUpdate = true;
        }
        if (!user.pfp) {
          user.pfp = profile.photos[0].value;
          needsUpdate = true;
        }
        if (needsUpdate) {
          await user.save();
        }
      } else {
        user = new User({
          facebookId: profile.id,
          username: profile.displayName.replace(/\s+/g, ''),
          pfp: profile.photos[0].value,
          email: profile.emails[0].value,
          verified: true
        });
        await user.save();
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }));

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing user with id:', id);
  try {
    const user = await User.findById(id);
    console.log('User found:', user);
    done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error);
  }
});




