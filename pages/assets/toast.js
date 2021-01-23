class Toast {
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
