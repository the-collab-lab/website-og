import { Toast } from '../toast.js';

class DonationNotification {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    const donation = urlParams.get('donation');

    this.status = donation;

    this.loaded();
  }

  loaded() {
    const toast = new Toast({
      element: document.getElementById('toast'),
      type: 'success',
      message: 'Thank you very much for supporting us! ❤️',
    });

    if (this.status === 'success') {
      toast.show();
    }
  }
}

export { DonationNotification };
