/**
 * Worker serving as main web application
 * Serves web/API requests
 * */
const compression = require('compression');
const session = require('cookie-session');
const express = require('express');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');
const config = require('./config');

const app = express();
// const apiKey = config.STEAM_API_KEY.split(',')[0];
const host = config.ROOT_URL;

const sessOptions = {
  domain: config.COOKIE_DOMAIN,
  maxAge: 52 * 7 * 24 * 60 * 60 * 1000,
  secret: config.SESSION_SECRET,
};

// PASSPORT config
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((accountId, done) => {
  done(null, {
    account_id: accountId,
  });
});
passport.use(new SteamStrategy({
  returnURL: `${host}/return`,
  realm: host,
  profile: false,
}, (identifier, profile, cb) => {
  const split = identifier.split('/');
  return cb(null, split[split.length - 1]);
}));
// Compression middleware
app.use(compression());
// Health check
app.route('/healthz').get((req, res) => {
  res.send('ok');
});
// Session/Passport middleware
app.use(session(sessOptions));
app.use(passport.initialize());
app.use(passport.session());
// CORS headers
app.use(cors({
  origin: true,
  credentials: true,
}));
app.route('/login').get(passport.authenticate('steam', {
  failureRedirect: '/api',
}));
app.route('/return').get(passport.authenticate('steam', {
  failureRedirect: '/api',
}), (req, res) => {
  if (config.UI_HOST) {
    return res.redirect(`${config.UI_HOST}/players/${req.user.account_id}`);
  }
  return res.redirect('/api/metadata');
});
app.route('/logout').get((req, res) => {
  req.logout();
  req.session = null;
  if (config.UI_HOST) {
    return res.redirect(config.UI_HOST);
  }
  return res.redirect('/api');
});
app.use('/api/metadata', (req, res) => {
    res.json(req.user);
});
// 404 route
app.use((req, res) => res.status(404).json({
  error: 'Not Found',
}));
// 500 route
app.use((err, req, res, cb) => {
  if (config.NODE_ENV === 'development' || config.NODE_ENV === 'test') {
    // default express handler
    return cb(err);
  }
  return res.status(500).json({
    error: 'Internal Server Error',
  });
});
const port = config.PORT || config.FRONTEND_PORT;
const server = app.listen(port, () => {
  console.log('[WEB] listening on %s', port);
});
/**
 * Wait for connections to end, then shut down
 * */
function gracefulShutdown() {
  console.log('Received kill signal, shutting down gracefully.');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit();
  });
  // if after
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, 10 * 1000);
}
// listen for TERM signal .e.g. kill
process.once('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.once('SIGINT', gracefulShutdown);
module.exports = app;