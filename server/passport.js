const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("./models/userModel");
const passport = require("passport");
const axios = require("axios")

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
  authorizationURL: `https://www.facebook.com/v3.2/dialog/oauth?config_id=875813711114836`, // Add config_id here
  tokenURL: 'https://graph.facebook.com/v3.2/oauth/access_token',
  profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email'],
  scope: ['email', 'public_profile'],
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      // Exchange short-lived token for long-lived token
      const response = await axios.get(`https://graph.facebook.com/v20.0/oauth/access_token`, {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: process.env.FACEBOOK_CLIENT_ID,
          client_secret: process.env.FACEBOOK_CLIENT_SECRET,
          fb_exchange_token: accessToken,
        },
      });
      const longLivedAccessToken = response.data.access_token;

      // Find or create the user
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
        if (user.facebookAccessToken !== longLivedAccessToken) {
          user.facebookAccessToken = longLivedAccessToken;
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
          verified: true,
          facebookAccessToken: longLivedAccessToken
        });
        await user.save();
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));


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




