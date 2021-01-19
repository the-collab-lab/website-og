const isProduction = () => process.env.CONTEXT === 'production';

module.exports = {
  STRIPE_SECRET_KEY: isProduction()
    ? process.env.STRIPE_SK_LIVE
    : process.env.STRIPE_SK_TEST,

  STRIPE_PUBLISHABLE_KEY: isProduction()
    ? process.env.STRIPE_PK_LIVE
    : process.env.STRIPE_PK_TEST,
};
