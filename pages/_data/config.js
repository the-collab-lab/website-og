// Netlify will change the values of these keys depending on
// the context in whoch the deploy is run, so we don't need to check
// what environment we're in.
// @see: https://docs.netlify.com/netlify-labs/experimental-features/environment-variables/

module.exports = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SK,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PK,
};
