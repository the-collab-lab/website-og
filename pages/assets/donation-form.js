import { Toast } from './toast.js';

/** Class representing a donation form */
class DonationForm {
  /**
   * Create our Stripe donation form
   * @param {Object} opts
   * @param {stripe.Stripe} opts.stripe
   * @param {Array<HTMLElement>} opts.checkoutButtons
   */
  constructor({ stripe, checkoutButtons }) {
    this.stripe = stripe;
    this.checkoutButtons = checkoutButtons;

    this.loaded();
  }

  loaded() {
    Array.from(this.checkoutButtons).forEach((checkoutButton) => {
      // on click, send the user to Stripe Checkout to process the donation
      checkoutButton.addEventListener('click', () => {
        const price = checkoutButton.dataset['stripePriceId'];

        checkoutButton.disabled = true;

        this.stripe
          .redirectToCheckout({
            lineItems: [{ price, quantity: 1 }],
            mode: 'payment',
            successUrl: `${window.location.origin}/about-us?donation=success#donation`,
            cancelUrl: `${window.location.origin}/about-us?donation=canceled#donation`,
          })
          .then(function (result) {
            checkoutButton.disabled = false;

            if (result.error) {
              new Toast({
                element: document.getElementById('toast'),
                type: 'error',
                message: result.error.message,
              }).show();
            }
          });
      });
    });
  }
}

export { DonationForm };
