const { getFrontPageApplicationBlock } = require('../graphql/data');

module.exports = async () => {
  const block = await getFrontPageApplicationBlock();
  const applicationBanner = `<div class="banner">${block.textBlocks[0].textContent.html}</div>`;

  return applicationBanner;
};
