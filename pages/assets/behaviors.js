import { Gallery } from './gallery.js';
import { DonationForm } from './donation-form.js';
import { DonationNotification } from './donation-notification.js';

function initDonationForm() {
  if (null !== document.getElementById('donation')) {
    // initialize Stripe using your publishable key
    const stripe = Stripe('{{ stripePublishableKey }}');

    // find the buttons and error message elements
    const checkoutButtons = document.getElementsByClassName(
      'checkout-button',
    );

    new DonationForm({ stripe, checkoutButtons });
  }
}

function init() {
  new Gallery();
  new DonationNotification();
  initDonationForm();
}

document.addEventListener('DOMContentLoaded', init);
