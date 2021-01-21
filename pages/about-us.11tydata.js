const Stripe = require('stripe');
const config = require('./_data/config');

module.exports = async () => {
  try {
    const stripe = Stripe(config.STRIPE_SECRET_KEY);
    const { data: products = [] } = await stripe.products.list();

    const options = await Promise.all(
      products.map(async (option) => {
        const { data: prices } = await stripe.prices.list({
          product: option.id,
        });
        const price = {
          ...prices[0],
          formatted_amount: prices[0].unit_amount / 100,
        };

        return { ...option, price };
      }),
    );

    const donationOptions = (options || []).sort(
      (a, b) => parseInt(a.price.unit_amount) - parseInt(b.price.unit_amount),
    );

    const stripePublishableKey = config.STRIPE_PUBLISHABLE_KEY;

    return {
      isDonationEnabled:
        donationOptions.length > 0 && stripePublishableKey !== undefined,
      donationOptions,
      stripePublishableKey,
    };
  } catch (err) {
    /** The view is prepared to handle empty donation options, so we can just return an empty list here */
    return {
      isDonationEnabled: false,
      donationOptions: [],
    };
  }
};
