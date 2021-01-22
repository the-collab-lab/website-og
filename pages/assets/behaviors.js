import { Gallery } from './gallery.js';
import { DonationNotification } from './donation-notification.js';

function init() {
  new Gallery();
  new DonationNotification();
}

document.addEventListener('DOMContentLoaded', init);
