class Toast {
  /**
   * Build a toast-style notification
   * @param {Object} opts
   * @param {HTMLElement} opts.element - The element that will be converted into the toast.
   * @param {'error' | 'success'} opts.type - The type of toast.
   * @param {String} opts.message - The message inside the toast.
   * @param {Boolean} [opts.autoClose=true] - Whether the toast will dismiss itself.
   * @param {Number} [opts.hideTimeout=5000] - The duration for which the toast element is visible.
   */
  constructor({
    element,
    type,
    message,
    autoClose = true,
    hideTimeout = 5000,
  }) {
    this.element = element;
    this.type = type;
    this.message = message;
    this.autoClose = autoClose;
    this.hideTimeout = hideTimeout;

    this.loaded();
  }

  loaded() {
    this.element.className = '';
    this.element.classList.add('toast', 'hidden', this.type);
    this.element.textContent = this.message;
  }

  show() {
    this.element.classList.remove('hidden');

    if (this.autoClose) {
      setTimeout(() => {
        this.hide();
      }, this.hideTimeout);
    }
  }

  hide() {
    this.element.classList.add('hidden');
  }
}

export { Toast };
