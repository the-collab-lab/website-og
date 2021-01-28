/* global Stripe */
import { Gallery } from './gallery.js';
import { DonationForm } from './donation-form.js';
import { DonationNotification } from './donation-notification.js';

function initDonationForm() {
  // test for presence of donation form before trying to init
  if (null !== document.querySelector('#donation .donation-options')) {
    const { __STRIPE_PUBLIC_KEY } = window;
    // bail if the key is not defined
    if (
      'undefined' === typeof __STRIPE_PUBLIC_KEY ||
      '' === __STRIPE_PUBLIC_KEY
    ) {
      return;
    }

    // initialize Stripe using your publishable key
    const stripe = Stripe(__STRIPE_PUBLIC_KEY);

    // find the buttons and error message elements
    const checkoutButtons = document.getElementsByClassName('checkout-button');

    new DonationForm({ stripe, checkoutButtons });
  }
}

function init() {
  new Gallery();
  new DonationNotification();
  initDonationForm();
}

document.addEventListener('DOMContentLoaded', init);
