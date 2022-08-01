const Stripe = require('stripe');
const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = require('./config');

module.exports = async () => {
  try {
    const stripe = Stripe(STRIPE_SECRET_KEY);
    const { data: products = [] } = await stripe.products.list({
      expand: ['data.default_price'],
    });

    const _options = products.map((option) => {
      option.price = {
        id: option.default_price.id,
        formatted_amount: option.default_price.unit_amount / 100,
      };

      return option;
    });

    const options = _options.sort(
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
