const { getFrontPageApplicationBlock } = require('./graphql/data');

module.exports = {
  layout: 'mlayout.liquid',
  applicationBanner: async () => {
    const block = await getFrontPageApplicationBlock();
    return `<div class="banner">${block.textBlocks[0].textContent.html}</div>`
  }
};
