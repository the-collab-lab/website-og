const Stripe = require('stripe');
const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = require('./env');

module.exports = async () => {
  try {
    const stripe = Stripe(STRIPE_SECRET_KEY);
    const { data: products = [] } = await stripe.products.list();

    const _options = await Promise.all(
      products.map(async (option) => {
        const { data: prices } = await stripe.prices.list({
          product: option.id,
        });

        option.price = {
          ...prices[0],
          formatted_amount: prices[0].unit_amount / 100,
        };

        return option;
      }),
    );

    const options = _options?.sort(
      (a, b) => parseInt(a.price.unit_amount) - parseInt(b.price.unit_amount),
    );

    return {
      enabled: options?.length > 0 && STRIPE_PUBLISHABLE_KEY !== undefined,
      options,
    };
  } catch (err) {
    /** The view is prepared to handle empty donation options, so we can just return an empty list here */
    return {
      enabled: false,
      options: [],
    };
  }
};
